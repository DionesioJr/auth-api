import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { PrismaService } from 'src/database/prisma.service';

dotenv.config();

@Injectable()
export class RefreshTokenUseCase {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async execute(headers): Promise<{ access_token: string }> {
    const refresh_token = this._extractToken(headers['authorization']);

    const existingKey = await this.prisma.users_access_keys.findFirst({
      where: { refresh_token: refresh_token, is_active: 1 },
    });

    if (!existingKey) {
      throw new UnauthorizedException('Invalid or inactive refresh token');
    }

    // Verificar e tipar o payload
    const payload = this.jwtService.verify(refresh_token, {
      secret: process.env.JWT_REFRESH_SECRET,
    });
    console.log(payload);

    // Gerar novo access token
    const new_access_token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      // expiresIn: '1h',
    });

    // Atualizar informações de uso do token
    await this.prisma.users_access_keys.update({
      where: { id: existingKey.id },
      data: {
        last_used_at: new Date(),
        ip_address: headers.ip,
        user_agent: headers['user-agent'],
      },
    });

    return { access_token: new_access_token };
  }

  private _extractToken(authHeader: string): string {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new Error('Invalid authorization header');
    }

    return authHeader.slice(7);
  }
}
