import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { ResponseTenantDto } from '../dto/response-tenant.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class FindOneTenantUseCase {
  constructor(private readonly prisma: PrismaService) {}

  private readonly logger = new Logger(FindOneTenantUseCase.name);

  async execute(id: number): Promise<ResponseTenantDto> {
    this.logger.log(`Fetching tenant with ID: ${id}.`);

    const tenant = await this.prisma.tenants.findUnique({ where: { id } });

    if (!tenant) {
      throw new NotFoundException(`Tenant with ID ${id} not found.`);
    }

    return plainToInstance(ResponseTenantDto, tenant);
  }
}
