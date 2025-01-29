import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class LogoutUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(headers): Promise<void> {
    const accessToken = this._extractToken(headers['authorization']);
    if (!accessToken) {
      throw new UnauthorizedException('Token not found or inactive');
    }

    await this.prisma.users_access_keys.updateMany({
      where: { access_token: accessToken },
      data: { is_active: 0 },
    });
  }

  private _extractToken(authHeader: string): string {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new Error('Invalid authorization header');
    }

    return authHeader.slice(7);
  }
}
