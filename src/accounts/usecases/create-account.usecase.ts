import { Injectable, Logger, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateAccountDto } from '../dto/create-account.dto';
import { ResponseAccountDto } from '../dto/response-account.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class CreateAccountUseCase {
  constructor(private readonly prisma: PrismaService) {}

  private readonly logger = new Logger(CreateAccountUseCase.name);

  async execute(createAccountDto: CreateAccountDto): Promise<ResponseAccountDto> {
    const { email, tenantId } = createAccountDto;

    this.logger.log(`Creating a new account with email: ${email}`);

    // Verificar duplicidade de email
    const existingAccount = await this.prisma.accounts.findUnique({
      where: { email },
    });
    if (existingAccount) {
      throw new ConflictException('Email already in use');
    }

    try {
      const account = await this.prisma.accounts.create({
        data: {
          ...createAccountDto,
          tenants: {
            connect: { id: tenantId }, // Conectar ao tenant existente
          },
        },
      });

      return plainToInstance(ResponseAccountDto, account);
    } catch (error) {
      this.logger.error('Error occurred while creating account', error);
      throw new InternalServerErrorException('Failed to create account');
    }
  }
}
