import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { ResponseTenantDto } from '../dto/response-tenant.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class FindTenantByUserIdUseCase {
  constructor(private readonly prisma: PrismaService) {}

  private readonly logger = new Logger(FindTenantByUserIdUseCase.name);

  async execute(userId: number): Promise<ResponseTenantDto[]> {
    this.logger.log(`Fetching tenants for user ID: ${userId}.`);

    // Buscar todas as contas associadas ao usuário
    const userAccounts = await this.prisma.accounts_users.findMany({
      where: { user_id: userId },
      select: {
        accounts: {
          select: {
            tenant_id: true, // Pega o ID do Tenant
            tenants: true, // Pega os dados do Tenant
          },
        },
      },
    });

    if (!userAccounts.length) {
      throw new NotFoundException(`No tenants found for user`);
    }

    // Extrair os dados dos tenants e converter para DTO
    const tenants = userAccounts.map((account) => account.accounts.tenants);

    return plainToInstance(ResponseTenantDto, tenants);
  }
}
