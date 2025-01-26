import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { TenantsService } from './tenants.service';
import { TenantsController } from './tenants.controller';
import { CreateTenantUseCase } from './usecases/create-tenant.usecase';
import { FindAllTenantsUseCase } from './usecases/find-all-tenants.usecase';
import { FindOneTenantUseCase } from './usecases/find-one-tenant.usecase';
import { UpdateTenantUseCase } from './usecases/update-tenant.usecase';
import { RemoveTenantUseCase } from './usecases/remove-tenant.usecase';
import { FindAccountsByTenantUseCase } from './usecases/find-accounts-by-tenant.usecase';
import { ValidateTenantSubdomainUseCase } from './usecases/validate-tenant-subdomain.usecase';

@Module({
  controllers: [TenantsController],
  providers: [
    PrismaService,
    TenantsService,
    CreateTenantUseCase,
    FindAllTenantsUseCase,
    FindOneTenantUseCase,
    UpdateTenantUseCase,
    RemoveTenantUseCase,
    FindAccountsByTenantUseCase,
    ValidateTenantSubdomainUseCase,
  ],
})
export class TenantsModule {}
