import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { plainToInstance } from 'class-transformer';
import { ResponseAccountDto } from '../dto/response-account.dto';

@Injectable()
export class FindAllAccountsByUserIdUseCase {
  constructor(private readonly prisma: PrismaService) {}

  private readonly logger = new Logger(FindAllAccountsByUserIdUseCase.name);

  async execute(userId: number): Promise<ResponseAccountDto[]> {
    this.logger.log(`Fetching instances for user ID: ${userId}.`);

    // Buscar todas as contas associadas ao usuário
    const userAccounts = await this.prisma.accounts_users.findMany({
      where: { user_id: userId },
      select: {
        accounts: true,
      },
    });

    if (!userAccounts.length) {
      throw new NotFoundException(`No instances found for user`);
    }

    // Extrair os dados dos instances e converter para DTO
    const instances = userAccounts.map((account) => account.accounts);

    return plainToInstance(ResponseAccountDto, instances);
  }
}
