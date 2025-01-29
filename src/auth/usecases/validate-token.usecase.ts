import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class ValidateTokenUseCase {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService
  ) {}

  private readonly logger = new Logger(ValidateTokenUseCase.name);

  async execute(headers: Headers): Promise<{ valid: boolean }> {
    this.logger.log('Validating token.');

    // Acessar headers corretamente
    const authHeader = headers['authorization'];
    if (!authHeader) {
      this.logger.log('Authorization header is missing');
      return { valid: false };
    }

    const accessToken = this._extractToken(authHeader);
    if (!accessToken) {
      this.logger.log('Token not found or inactive');
      return { valid: false };
    }

    // Tipagem correta do decode()
    const decodedToken = this.jwtService.decode(accessToken);
    if (!decodedToken || !decodedToken.email) {
      this.logger.log('Invalid token payload');
      return { valid: false };
    }

    const { email } = decodedToken;
    const user = await this.prisma.users.findUnique({ where: { email } });
    if (!user) {
      this.logger.log('User not found');
      return { valid: false };
    }

    try {
      this.jwtService.verify(accessToken, { secret: process.env.JWT_SECRET });

      const existingKey = await this.prisma.users_access_keys.findFirst({
        where: { access_token: accessToken, is_active: 1 },
      });

      if (!existingKey) {
        this.logger.log('Token not found or inactive');
        return { valid: false };
      }

      await this.prisma.users_access_keys.update({
        where: { id: existingKey.id },
        data: { last_used_at: new Date() },
      });

      if (
        (headers['id'] && headers['id'] !== existingKey.ip_address) ||
        (headers['user-gent'] && headers['user-gent'] !== existingKey.user_agent)
      ) {
        this.logger.log('Token validation failed');
        return { valid: false };
      }

      return { valid: true };
    } catch (err: unknown) {
      if (err instanceof Error) {
        if (err.name === 'JsonWebTokenError') {
          this.logger.log('Invalid signature');
          return { valid: false };
        }
        if (err.name === 'TokenExpiredError') {
          this.logger.log('Token expired');
          return { valid: false };
        }
        this.logger.error(`Unexpected error: ${err.message}`);
      }

      return { valid: false }; // ✅ Agora sempre retorna um valor
    }
  }

  private _extractToken(authHeader: string): string {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return '';
    }
    return authHeader.slice(7);
  }
}
