import {
  Injectable,
  Logger,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateAccountDto } from '../dto/create-account.dto';
import { ResponseAccountDto } from '../dto/response-account.dto';
import { plainToInstance } from 'class-transformer';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { CreateUserUseCase } from 'src/users/usecases/create-user.usecase';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class CreateAccountUseCase {
  constructor(
    private readonly prisma: PrismaService,
    private readonly createUserUseCase: CreateUserUseCase,
  ) {}

  private readonly logger = new Logger(CreateAccountUseCase.name);

  async execute(
    createAccountDto: CreateAccountDto,
  ): Promise<ResponseAccountDto> {
    this.logger.log('Creating a new account.');

 
    // Verificar duplicidade de email
    const existingUser = await this.prisma.users.findUnique({
      where: { createAccountDto.email },
    });
    if (existingUser) {
      throw new ConflictException('Email already in use');
    }

    // Verificar duplicidade de subdomínio
    const existingTenant = await this.prisma.tenants.findUnique({
      where: { createAccountDto.subdomain },
    });
    if (existingTenant) {
      throw new ConflictException('Subdomain already in use');
    }

    try {
      // Criar Tenant
      const tenant = await this.prisma.tenants.create({
        data: {
          name: createAccountDto.name,
          subdomain: createAccountDto.subdomain,
          database_url: process.env.DATABASE_URL ?? '',
          database_name: process.env.DATABASE_NAME ?? '',
          database_user: process.env.DATABASE_USER ?? '',
          database_password: process.env.DATABASE_PASSWORD ?? '',
          database_host: process.env.DATABASE_HOST ?? '',
          database_port: parseInt(process.env.DATABASE_PORT ?? '', 10),
        },
      });

      // Criar Account
      const account = await this.prisma.accounts.create({
        data: {
          tenant_id: tenant.id,
          name: createAccountDto.name,
          email: createAccountDto.email,
        },
      });

      // Criar Usuário associado à conta

      const user: CreateUserDto = {
        email: createAccountDto.email,
        password: createAccountDto.password,
        name: createAccountDto.name,
        accounts_users: {
          create: {
            account_id: account.id,
            is_owner: 1,
          },
        },
      };
      this.createUserUseCase.execute(user);

      return plainToInstance(ResponseAccountDto, account);
    } catch (error) {
      this.logger.error('Error occurred while creating account', error);
      throw new InternalServerErrorException('Failed to create account');
    }
  }
}
