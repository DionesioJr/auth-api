import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class LogoutUseCase {
  constructor(private readonly prisma: PrismaService) {}

  private readonly logger = new Logger(LogoutUseCase.name);
  async execute(headers): Promise<void> {
    this.logger.log('User is logging out');
    const accessToken = this._extractToken(headers['authorization']);
    if (!accessToken) {
      throw new UnauthorizedException('Token not found or inactive');
    }

    const response = await this.prisma.users_access_keys.updateMany({
      where: { access_token: accessToken },
      data: { is_active: 0 },
    });

    if (response['count'] === 0) {
      throw new UnauthorizedException('Failed to logout user');
    } else {
      this.logger.log('User logged out successfully');
    }
  }

  private _extractToken(authHeader: string): string {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new Error('Invalid authorization header');
    }

    return authHeader.slice(7);
  }
}
