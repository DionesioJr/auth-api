import { Injectable } from '@nestjs/common';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { CreateTenantUseCase } from './usecases/create-tenant.usecase';
import { FindAllTenantsUseCase } from './usecases/find-all-tenants.usecase';
import { FindOneTenantUseCase } from './usecases/find-one-tenant.usecase';
import { UpdateTenantUseCase } from './usecases/update-tenant.usecase';
import { RemoveTenantUseCase } from './usecases/remove-tenant.usecase';
import { FindAccountsByTenantIdUseCase } from './usecases/find-accounts-by-tenant-id.usecase';
import { ValidateTenantSubdomainUseCase } from './usecases/validate-tenant-subdomain.usecase';

@Injectable()
export class TenantsService {
  constructor(
    private readonly createTenantUseCase: CreateTenantUseCase,
    private readonly findAllTenantsUseCase: FindAllTenantsUseCase,
    private readonly findOneTenantUseCase: FindOneTenantUseCase,
    private readonly updateTenantUseCase: UpdateTenantUseCase,
    private readonly removeTenantUseCase: RemoveTenantUseCase,
    private readonly findAccountsByTenantIdUseCase: FindAccountsByTenantIdUseCase,
    private readonly validateTenantSubdomainUseCase: ValidateTenantSubdomainUseCase
  ) {}

  async create(createTenantDto: CreateTenantDto) {
    return this.createTenantUseCase.execute(createTenantDto);
  }

  async findAll() {
    return this.findAllTenantsUseCase.execute();
  }

  async findOne(id: number) {
    return this.findOneTenantUseCase.execute(id);
  }

  async update(id: number, updateTenantDto: UpdateTenantDto) {
    return this.updateTenantUseCase.execute(id, updateTenantDto);
  }

  async remove(id: number) {
    return this.removeTenantUseCase.execute(id);
  }

  async findAccountsByTenant(tenantId: number) {
    return this.findAccountsByTenantIdUseCase.execute(tenantId);
  }

  async validateSubdomain(subdomain: string) {
    return this.validateTenantSubdomainUseCase.execute(subdomain);
  }
}
