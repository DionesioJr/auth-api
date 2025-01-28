import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';

import { LoginDto } from '../dto/login.dto';

dotenv.config();

@Injectable()
export class LoginUseCase {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async execute(loginDto: LoginDto, headers): Promise<{ access_token: string; refresh_token: string }> {
    const user = await this.prisma.users.findUnique({ where: { email: loginDto.email } });

    if (!user || !(await bcrypt.compare(loginDto.password, user.password || ''))) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Definindo o payload padrão do JWT
    const payload = {
      sub: user.id, // Identificador único do usuário (sub = subject)
      email: user.email, // Email do usuário
      role: {}, // Papel/função do usuário (opcional)
      device: headers['device-name'], // Nome do dispositivo (opcional)
      ip: headers.ip, // Endereço IP (opcional)
    };

    // Gerando o token de acesso
    const access_token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '1h', // Token expira em 1 hora
    });

    // Gerando o token de atualização
    const refresh_token = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '7d', // Token de atualização expira em 7 dias
    });

    // Salvando as chaves de acesso no banco de dados
    await this.prisma.users_access_keys.create({
      data: {
        user_id: user.id,
        access_token,
        refresh_token,
        is_active: 1,
        device_name: headers['device-name'],
        ip_address: headers.ip,
        user_agent: headers['user-agent'],
      },
    });

    return { access_token, refresh_token };
  }
}
