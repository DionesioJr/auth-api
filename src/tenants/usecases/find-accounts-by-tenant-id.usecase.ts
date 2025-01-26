import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { plainToInstance } from 'class-transformer';
import { ResponseAccountDto } from '../../accounts/dto/response-account.dto';

@Injectable()
export class FindAccountsByTenantIdUseCase {
  constructor(private readonly prisma: PrismaService) {}

  private readonly logger = new Logger(FindAccountsByTenantIdUseCase.name);

  async execute(tenantId: number): Promise<ResponseAccountDto[]> {
    this.logger.log(`Fetching accounts for tenant ID: ${tenantId}.`);

    const tenant = await this.prisma.tenants.findUnique({
      where: { id: tenantId },
    });

    if (!tenant) {
      throw new NotFoundException(`Tenant with ID ${tenantId} not found.`);
    }

    const accounts = await this.prisma.accounts.findMany({
      where: { tenant_id: tenantId },
    });

    return plainToInstance(ResponseAccountDto, accounts);
  }
}
