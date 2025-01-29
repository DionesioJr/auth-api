import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { PrismaService } from 'src/database/prisma.service';
import { GenerateTokensUseCase } from './generate-tokens.usecase';
import { IPayload } from '../interfaces/payload.interface';
import { ITokens } from '../interfaces/tokens.interface';

dotenv.config();

@Injectable()
export class RefreshTokenUseCase {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly generateTokensUseCase: GenerateTokensUseCase
  ) {}

  private readonly logger = new Logger(RefreshTokenUseCase.name);

  async execute(headers: Headers): Promise<ITokens> {
    this.logger.log('Refreshing token.');

    const authHeader = headers['authorization'] as string | undefined;
    if (!authHeader) {
      throw new UnauthorizedException('Authorization header is missing');
    }

    const refreshToken = this._extractToken(authHeader);
    if (!refreshToken) {
      throw new UnauthorizedException('Token not found or inactive');
    }

    const existingKey = await this.prisma.users_access_keys.findFirst({
      where: { refresh_token: refreshToken, is_active: 1 },
    });
    if (!existingKey) {
      throw new UnauthorizedException('Invalid or inactive refresh token');
    }

    // Verificar e tipar o payload
    this.jwtService.verify(refreshToken, {
      secret: process.env.JWT_REFRESH_SECRET,
    });

    const { email } = this.jwtService.decode(refreshToken);
    if (!email) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
    const user = await this.prisma.users.findUnique({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const payload: IPayload = {
      sub: user.id,
      email: user.email,
      role: 'user',
      ip: typeof headers['ip'] === 'string' ? headers['ip'] : '0.0.0.0',
      device: typeof headers['device-name'] === 'string' ? headers['device-name'] : '',
      user_agent: typeof headers['user-agent'] === 'string' ? headers['user-agent'] : '',
    };
    const tokens: ITokens = this.generateTokensUseCase.execute(payload);

    // Atualizar informações de uso do token
    await this.prisma.users_access_keys.update({
      where: { id: existingKey.id },
      data: {
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
        last_used_at: new Date(),
        ip_address: typeof headers['ip'] === 'string' ? headers['ip'] : '0.0.0.0',
        user_agent: typeof headers['user-agent'] === 'string' ? headers['user-agent'] : '',
      },
    });

    return tokens;
  }

  private _extractToken(authHeader: string): string {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return '';
    }

    return authHeader.slice(7);
  }
}
