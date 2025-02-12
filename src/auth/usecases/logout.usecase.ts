import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LogoutUseCase {
  constructor(private readonly prisma: PrismaService) {}

  private readonly logger = new Logger(LogoutUseCase.name);
  async execute(headers: Headers): Promise<void> {
    this.logger.log('User is logging out');
    const authHeader = headers['authorization'] as string | undefined;
    if (!authHeader) {
      throw new UnauthorizedException('Authorization header is missing');
    }

    const accessToken = this._extractToken(authHeader);
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
      return '';
    }

    return authHeader.slice(7);
  }
}
