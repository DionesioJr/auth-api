import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { IPayload } from '../interfaces/payload.interface';

dotenv.config();

@Injectable()
export class GenerateTokensUseCase {
  constructor(private readonly jwtService: JwtService) {}

  execute(payload: IPayload): { access_token: string; refresh_token: string } {
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

    return { access_token, refresh_token };
  }
}
