import { Injectable, Logger, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateTenantDto } from '../dto/create-tenant.dto';
import { ResponseTenantDto } from '../dto/response-tenant.dto';
import { plainToInstance } from 'class-transformer';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class CreateTenantUseCase {
  constructor(private readonly prisma: PrismaService) {}

  private readonly logger = new Logger(CreateTenantUseCase.name);

  async execute(createTenantDto: CreateTenantDto): Promise<ResponseTenantDto> {
    const { subdomain } = createTenantDto;

    this.logger.log(`Creating a new tenant with subdomain: ${subdomain}`);

    // Verificar duplicidade de subdomínio
    const existingTenant = await this.prisma.tenants.findUnique({
      where: { subdomain },
    });
    if (existingTenant) {
      throw new ConflictException('Subdomain already in use');
    }

    try {
      // Garantindo que nenhum campo obrigatório seja undefined
      const tenantData = {
        name: createTenantDto.name,
        subdomain,
        is_active: createTenantDto.is_active ?? true,
        database_host: process.env.DATABASE_HOST ?? '',
        database_port: parseInt(process.env.DATABASE_PORT ?? '', 10),
        database_user: process.env.DATABASE_USER ?? '',
        database_password: process.env.DATABASE_PASSWORD ?? '',
        database_name: `${subdomain}_app_db`,
      };

      const tenant = await this.prisma.tenants.create({
        data: tenantData,
      });

      return plainToInstance(ResponseTenantDto, tenant);
    } catch (error) {
      this.logger.error('Error occurred while creating tenant', error);
      throw new InternalServerErrorException('Failed to create tenant');
    }
  }
}
