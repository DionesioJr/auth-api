import * as bcrypt from 'bcryptjs';
import * as dotenv from 'dotenv';

import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto } from '../dto/login.dto';
import { GenerateTokensUseCase } from './generate-tokens.usecase';
import { IPayload } from '../interfaces/payload.interface';
import { ITokens } from '../interfaces/tokens.interface';
import { AccountsService } from 'src/accounts/accounts.service';

dotenv.config();

@Injectable()
export class LoginUseCase {
  constructor(
    private readonly prisma: PrismaService,
    private readonly generateTokensUseCase: GenerateTokensUseCase,
    private readonly accountsService: AccountsService
  ) {}

  private readonly logger = new Logger(GenerateTokensUseCase.name);

  async execute(loginDto: LoginDto, headers: Headers): Promise<ITokens> {
    this.logger.log(`Logging in user with email: ${loginDto.email}`);

    const user = await this.prisma.users.findUnique({ where: { email: loginDto.email } });
    if (!user) {
      throw new UnauthorizedException('Access denied');
    }

    if (!(await bcrypt.compare(loginDto.password, user.password || ''))) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const accounts = await this.accountsService.findAllAccountsByUserId(user.id);
    if (!accounts) {
      throw new UnauthorizedException('Accounts not found');
    }

    const payload: IPayload = {
      sub: user.id,
      email: user.email,
    };
    const tokens: ITokens = this.generateTokensUseCase.execute(payload);

    // Salvando as chaves de acesso no banco de dados
    const data_create_access = {
      user_id: user.id,
      uuid: user.uuid,
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
      is_active: 1,
      device_name: typeof headers['device-name'] === 'string' ? headers['device-name'] : '',
      ip_address: typeof headers['ip'] === 'string' ? headers['ip'] : '0.0.0.0',
      user_agent: typeof headers['user-agent'] === 'string' ? headers['user-agent'] : '',
    };
    await this.prisma.users_access_keys.create({
      data: data_create_access,
    });

    return tokens;
  }
}
