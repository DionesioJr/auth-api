import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { LoginDto } from '../dto/login.dto';

@Injectable()
export class LoginUseCase {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async execute(
    loginDto: LoginDto,
    headers: { 'device-name': string; 'user-agent': string; ip: string },
  ): Promise<{ access_token: string; refresh_token: string }> {
    const user = await this.prisma.users.findUnique({ where: { email: loginDto.email } });

    if (!user || !(await bcrypt.compare(loginDto.password, user.password || ''))) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const payload = { userId: user.id, email: user.email };
    const access_token = this.jwtService.sign(payload, { secret: process.env.JWT_SECRET, expiresIn: '1h' });
    const refresh_token = this.jwtService.sign(payload, { secret: process.env.JWT_REFRESH_SECRET, expiresIn: '7d' });

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
