import { Injectable } from '@nestjs/common';

import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { CreateTenantDto } from 'src/tenants/dto/create-tenant.dto';

import { CreateAccountUseCase } from './usecases/create-account.usecase';
import { FindAllAccountsUseCase } from './usecases/find-all-accounts.usecase';
import { FindOneAccountUseCase } from './usecases/find-one-account.usecase';
import { UpdateAccountUseCase } from './usecases/update-account.usecase';
import { RemoveAccountUseCase } from './usecases/remove-account.usecase';
import { FindUsersByAccountUseCase } from './usecases/find-users-by-account.usecase';

import { TenantsService } from 'src/tenants/tenants.service';
import { UsersService } from 'src/users/users.service';
import { RequestCreateAccountDto } from './dto/request-create-account.dto';

@Injectable()
export class AccountsService {
  constructor(
    private readonly createAccountUseCase: CreateAccountUseCase,
    private readonly findAllAccountsUseCase: FindAllAccountsUseCase,
    private readonly findOneAccountUseCase: FindOneAccountUseCase,
    private readonly updateAccountUseCase: UpdateAccountUseCase,
    private readonly removeAccountUseCase: RemoveAccountUseCase,
    private readonly findUsersByAccountUseCase: FindUsersByAccountUseCase,

    private readonly tenantsService: TenantsService,
    private readonly usersService: UsersService,
  ) {}

  async create(createAccountRequestDto: RequestCreateAccountDto) {
    const { name, subdomain, email, phone, password } = createAccountRequestDto;

    // Criando o tenant
    const dataTenant: CreateTenantDto = {
      subdomain: subdomain,
    };
    const tenant = await this.tenantsService.create(dataTenant);

    // Criando o usuário associado à conta
    const dataAccount: CreateAccountDto = {
      name: name,
      email: email,
      tenant_id: tenant.id,
      phone: phone,
    };
    const account = await this.createAccountUseCase.execute(dataAccount);

    // Criando o usuário associado à conta
    const dataUser: CreateUserDto = {
      name: name,
      email: email,
      phone: phone,
      password: password,
    };
    const users = await this.usersService.create(dataUser);

    return { account, users, tenant };
  }

  async findAll() {
    return this.findAllAccountsUseCase.execute();
  }

  async findOne(id: number) {
    return this.findOneAccountUseCase.execute(id);
  }

  async update(id: number, updateAccountDto: UpdateAccountDto) {
    return this.updateAccountUseCase.execute(id, updateAccountDto);
  }

  async remove(id: number) {
    return this.removeAccountUseCase.execute(id);
  }

  async findUsersByAccount(accountId: number) {
    return this.findUsersByAccountUseCase.execute(accountId);
  }
}
