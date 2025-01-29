import { Injectable, Logger, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateTenantDto } from '../dto/create-tenant.dto';
import { ResponseTenantDto } from '../dto/response-tenant.dto';
import { plainToInstance } from 'class-transformer';
import * as dotenv from 'dotenv';
import { ValidateTenantSubdomainUseCase } from './validate-tenant-subdomain.usecase';

dotenv.config();

@Injectable()
export class CreateTenantUseCase {
  constructor(
    private readonly prisma: PrismaService,
    private readonly validateTenantSubdomainUseCase: ValidateTenantSubdomainUseCase,
  ) {}

  private readonly logger = new Logger(CreateTenantUseCase.name);

  async execute(createTenantDto: CreateTenantDto): Promise<ResponseTenantDto> {
    const { subdomain } = createTenantDto;
    this.logger.log(`Creating a new tenant with subdomain: ${subdomain}`);

    // Validar subdomínio usando o caso de uso específico
    const { isAvailable } = await this.validateTenantSubdomainUseCase.execute(subdomain);
    if (!isAvailable) {
      throw new ConflictException('Subdomain already in use');
    }

    // Garantindo que nenhum campo obrigatório seja undefined
    const tenantData = {
      subdomain,
      is_active: createTenantDto.is_active ?? true,
      database_host: process.env.DATABASE_HOST ?? '',
      database_port: parseInt(process.env.DATABASE_PORT ?? '', 10),
      database_user: process.env.DATABASE_USER ?? '',
      database_password: process.env.DATABASE_PASSWORD ?? '',
      database_name: `${subdomain}_app_db`,
    };

    try {
      // Criação do tenant no banco de dados
      const tenant = await this.prisma.tenants.create({
        data: tenantData,
      });

      this.logger.log(`Tenant created successfully with subdomain: ${subdomain}`);
      return plainToInstance(ResponseTenantDto, tenant);
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.logger.error('Error occurred while creating tenant', error.stack);
      } else {
        this.logger.error(`Unexpected error: ${JSON.stringify(error)}`);
      }
      throw new InternalServerErrorException('Failed to create tenant');
    }
  }
}
