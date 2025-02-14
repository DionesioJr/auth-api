import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { plainToInstance } from 'class-transformer';
import { ResponseAccountDto } from '../dto/response-account.dto';

@Injectable()
export class FindOneAccountByEmailUseCase {
  constructor(private readonly prisma: PrismaService) {}

  private readonly logger = new Logger(FindOneAccountByEmailUseCase.name);

  async execute(email: string): Promise<ResponseAccountDto> {
    this.logger.log(`Fetching account with email: ${email}.`);

    const account = await this.prisma.accounts.findUnique({ where: { email } });

    if (!account) {
      throw new NotFoundException(`Account with email ${email} not found.`);
    }

    return plainToInstance(ResponseAccountDto, account);
  }
}
