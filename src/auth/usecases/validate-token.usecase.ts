import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class ValidateTokenUseCase {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async execute(headers): Promise<{ valid: boolean }> {
    const refreshToken = this._extractToken(headers['authorization']);

    if (!refreshToken) {
      throw new UnauthorizedException('Token not found or inactive');
    }

    const { email } = this.jwtService.decode(refreshToken);

    const user = await this.prisma.users.findUnique({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    try {
      this.jwtService.verify(refreshToken, { secret: process.env.JWT_SECRET });

      const existingKey = await this.prisma.users_access_keys.findFirst({
        where: { refresh_token: refreshToken, is_active: 1 },
      });

      if (!existingKey) {
        throw new UnauthorizedException('Token not found or inactive');
      }

      await this.prisma.users_access_keys.update({
        where: { id: existingKey.id },
        data: { last_used_at: new Date() },
      });

      if (
        (headers.ip && headers.ip !== existingKey.ip_address) ||
        (headers['user-agent'] && headers['user-agent'] !== existingKey.user_agent)
      ) {
        throw new UnauthorizedException('Token validation failed');
      }

      return { valid: true };
    } catch (err) {
      if (err.name === 'JsonWebTokenError') {
        throw new UnauthorizedException('Invalid signature');
      }
      if (err.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Token expired');
      }
      throw new UnauthorizedException(err.name);
    }
  }

  private _extractToken(authHeader: string): string {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Invalid authorization header');
    }

    return authHeader.slice(7);
  }
}
