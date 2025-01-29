import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';

import { LoginDto } from '../dto/login.dto';
import { GenerateTokensUseCase } from './generate-tokens.usecase';

dotenv.config();

@Injectable()
export class LoginUseCase {
  constructor(
    private readonly prisma: PrismaService,
    private readonly generateTokensUseCase: GenerateTokensUseCase,
  ) {}

  async execute(loginDto: LoginDto, headers): Promise<{ access_token: string; refresh_token: string }> {
    const user = await this.prisma.users.findUnique({ where: { email: loginDto.email } });

    if (!user || !(await bcrypt.compare(loginDto.password, user.password || ''))) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const tokens: any = this.generateTokensUseCase.execute(user, headers);

    // Salvando as chaves de acesso no banco de dados
    const data_create_access = {
      user_id: user.id,
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
      is_active: 1,
      device_name: headers['device-name'],
      ip_address: headers.ip,
      user_agent: headers['user-agent'],
    };
    await this.prisma.users_access_keys.create({
      data: data_create_access,
    });

    return tokens;
  }
}
