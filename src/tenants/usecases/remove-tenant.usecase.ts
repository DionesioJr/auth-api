import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { ResponseTenantDto } from '../dto/response-tenant.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class RemoveTenantUseCase {
  constructor(private readonly prisma: PrismaService) {}

  private readonly logger = new Logger(RemoveTenantUseCase.name);

  async execute(id: number): Promise<ResponseTenantDto> {
    this.logger.log(`Removing tenant with ID: ${id}.`);

    const existingTenant = await this.prisma.tenants.findUnique({
      where: { id },
    });

    if (!existingTenant) {
      throw new NotFoundException(`Tenant with ID ${id} not found.`);
    }

    const deletedTenant = await this.prisma.tenants.update({
      where: { id },
      data: { is_active: false },
    });

    return plainToInstance(ResponseTenantDto, deletedTenant);
  }
}
