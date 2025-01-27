import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/database/prisma.service';
import { RefreshTokenDto } from '../dto/refresh-token.dto';

interface JwtPayload {
  sub: string; // Exemplo de ID do usuário
  email: string; // Outros campos relevantes
  // Adicione outros campos do payload conforme necessário
}

@Injectable()
export class RefreshTokenUseCase {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async execute(
    refreshTokenDto: RefreshTokenDto,
    headers: { ip: string; 'user-agent': string },
  ): Promise<{ access_token: string }> {
    const existingKey = await this.prisma.users_access_keys.findFirst({
      where: { refresh_token: refreshTokenDto.refresh_token, is_active: 1 },
    });

    if (!existingKey) {
      throw new UnauthorizedException('Invalid or inactive refresh token');
    }

    // Verificar e tipar o payload
    const payload = this.jwtService.verify<JwtPayload>(refreshTokenDto.refresh_token, {
      secret: process.env.JWT_REFRESH_SECRET,
    });

    // Gerar novo access token
    const new_access_token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '1h',
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
}
