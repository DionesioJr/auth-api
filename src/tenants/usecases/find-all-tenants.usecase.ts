import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { ResponseTenantDto } from '../dto/response-tenant.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class FindAllTenantsUseCase {
  constructor(private readonly prisma: PrismaService) {}

  private readonly logger = new Logger(FindAllTenantsUseCase.name);

  async execute(): Promise<ResponseTenantDto[]> {
    this.logger.log('Fetching all tenants.');

    const tenants = await this.prisma.tenants.findMany();

    return plainToInstance(ResponseTenantDto, tenants);
  }
}
