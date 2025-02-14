import { Injectable, Logger, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAccountDto } from '../dto/create-account.dto';
import { ResponseAccountDto } from '../dto/response-account.dto';
import { plainToInstance } from 'class-transformer';
import { ValidateInstanceUseCase } from './validate-instance.usecase';

@Injectable()
export class CreateAccountUseCase {
  constructor(
    private readonly prisma: PrismaService,
    private readonly validateInstanceUseCase: ValidateInstanceUseCase
  ) {}

  private readonly logger = new Logger(CreateAccountUseCase.name);

  async execute(createAccountDto: CreateAccountDto): Promise<ResponseAccountDto> {
    const { email } = createAccountDto;

    // Validar subdomínio usando o caso de uso específico
    const { isAvailable } = await this.validateInstanceUseCase.execute(createAccountDto.instance);
    if (!isAvailable) {
      throw new ConflictException('Inatance already in use');
    }

    this.logger.log(`Creating a new account with email: ${email}`);

    // Verificar duplicidade de email
    const existingAccount = await this.prisma.accounts.findUnique({
      where: { email },
    });
    if (existingAccount) {
      throw new ConflictException('Email already in use for another account');
    }

    try {
      const account = await this.prisma.accounts.create({
        data: {
          ...createAccountDto,
        },
      });

      return plainToInstance(ResponseAccountDto, account);
    } catch (error) {
      this.logger.error('Error occurred while creating account', error);
      throw new InternalServerErrorException('Failed to create account');
    }
  }
}
