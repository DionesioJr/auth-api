import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { ResponseAccountDto } from '../dto/response-account.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class FindOneAccountUseCase {
  constructor(private readonly prisma: PrismaService) {}

  private readonly logger = new Logger(FindOneAccountUseCase.name);

  async execute(id: number): Promise<ResponseAccountDto> {
    this.logger.log(`Fetching account with ID: ${id}.`);

    if (!id) {
      throw new NotFoundException(`Account with ID ${id} not found.`);
    }

    const account = await this.prisma.accounts.findUnique({ where: { id } });

    if (!account) {
      throw new NotFoundException(`Account with ID ${id} not found.`);
    }

    return plainToInstance(ResponseAccountDto, account);
  }
}
