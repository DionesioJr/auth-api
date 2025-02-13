import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ValidateTokenUseCase {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService
  ) {}

  private readonly logger = new Logger(ValidateTokenUseCase.name);

  async execute(headers: Headers): Promise<any> {
    this.logger.log('Validating token.');

    // Acessar headers corretamente
    const authHeader = headers['authorization'];
    if (!authHeader) {
      throw new UnauthorizedException('Authorization header is missing');
    }

    const accessToken = this._extractToken(authHeader);
    if (!accessToken) {
      throw new UnauthorizedException('Token not found or inactive');
    }

    // Tipagem correta do decode()
    const decodedToken = this.jwtService.decode(accessToken);
    if (!decodedToken || !decodedToken.email) {
      throw new UnauthorizedException('Invalid token payload');
    }

    const { email } = decodedToken;
    const user = await this.prisma.users.findUnique({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const existingKey = await this.prisma.users_access_keys.findFirst({
      where: { access_token: accessToken, is_active: 1 },
    });
    if (!existingKey) {
      throw new UnauthorizedException('Invalid or inactive token');
    }

    try {
      this.jwtService.verify(accessToken, { secret: process.env.JWT_SECRET });

      const existingKey = await this.prisma.users_access_keys.findFirst({
        where: { access_token: accessToken, is_active: 1 },
      });

      if (!existingKey) {
        throw new UnauthorizedException('Token not found or inactive');
      }

      await this.prisma.users_access_keys.update({
        where: { id: existingKey.id },
        data: { last_used_at: new Date() },
      });

      if (
        (headers['id'] && headers['id'] !== existingKey.ip_address) ||
        (headers['user-gent'] && headers['user-gent'] !== existingKey.user_agent)
      ) {
        throw new UnauthorizedException('Token validation failed');
      }

      return { valid: true };
    } catch (err: unknown) {
      if (err instanceof Error) {
        if (err.name === 'JsonWebTokenError') {
          throw new UnauthorizedException('Invalid signature');
        }
        if (err.name === 'TokenExpiredError') {
          throw new UnauthorizedException('Token expired');
        }
        this.logger.error(`Unexpected error: ${err.message}`);
      }

      return;
    }
  }

  private _extractToken(authHeader: string): string {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return '';
    }
    return authHeader.slice(7);
  }
}
