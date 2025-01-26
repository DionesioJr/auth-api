import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { UpdateTenantDto } from '../dto/update-tenant.dto';
import { ResponseTenantDto } from '../dto/response-tenant.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UpdateTenantUseCase {
  constructor(private readonly prisma: PrismaService) {}

  private readonly logger = new Logger(UpdateTenantUseCase.name);

  async execute(id: number, updateTenantDto: UpdateTenantDto): Promise<ResponseTenantDto> {
    this.logger.log(`Updating tenant with ID: ${id}.`);

    const existingTenant = await this.prisma.tenants.findUnique({
      where: { id },
    });

    if (!existingTenant) {
      throw new NotFoundException(`Tenant with ID ${id} not found.`);
    }

    const updatedTenant = await this.prisma.tenants.update({
      where: { id },
      data: updateTenantDto,
    });

    return plainToInstance(ResponseTenantDto, updatedTenant);
  }
}
