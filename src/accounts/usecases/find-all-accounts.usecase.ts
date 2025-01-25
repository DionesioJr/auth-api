import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { ResponseAccountDto } from '../dto/response-account.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class FindAllAccountsUseCase {
  constructor(private readonly prisma: PrismaService) {}

  private readonly logger = new Logger(FindAllAccountsUseCase.name);

  async execute(): Promise<ResponseAccountDto[]> {
    this.logger.log('Fetching all accounts.');

    const accounts = await this.prisma.accounts.findMany();
    return plainToInstance(ResponseAccountDto, accounts);
  }
}
