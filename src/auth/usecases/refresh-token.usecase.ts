import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { PrismaService } from 'src/database/prisma.service';
import { GenerateTokensUseCase } from './generate-tokens.usecase';

dotenv.config();

@Injectable()
export class RefreshTokenUseCase {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly generateTokensUseCase: GenerateTokensUseCase,
  ) {}

  async execute(headers): Promise<{ access_token: string }> {
    const refreshToken = this._extractToken(headers['authorization']);
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
    const user = await this.prisma.users.findUnique({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const tokens: any = this.generateTokensUseCase.execute(user, headers);

    // Atualizar informações de uso do token
    await this.prisma.users_access_keys.update({
      where: { id: existingKey.id },
      data: {
        last_used_at: new Date(),
        ip_address: headers.ip,
        user_agent: headers['user-agent'],
      },
    });

    return tokens;
  }

  private _extractToken(authHeader: string): string {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new Error('Invalid authorization header');
    }

    return authHeader.slice(7);
  }
}
