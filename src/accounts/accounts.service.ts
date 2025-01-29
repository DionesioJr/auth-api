import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

// DTOs
import { UpdateAccountDto } from './dto/update-account.dto';
import { RequestCreateAccountDto } from './dto/request-create-account.dto';

// UseCases
import { CreateAccountUseCase } from './usecases/create-account.usecase';
import { FindAllAccountsUseCase } from './usecases/find-all-accounts.usecase';
import { FindOneAccountUseCase } from './usecases/find-one-account.usecase';
import { UpdateAccountUseCase } from './usecases/update-account.usecase';
import { RemoveAccountUseCase } from './usecases/remove-account.usecase';
import { FindUsersByAccountUseCase } from './usecases/find-users-by-account.usecase';

// Services
import { TenantsService } from 'src/tenants/tenants.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AccountsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly createAccountUseCase: CreateAccountUseCase,
    private readonly findAllAccountsUseCase: FindAllAccountsUseCase,
    private readonly findOneAccountUseCase: FindOneAccountUseCase,
    private readonly updateAccountUseCase: UpdateAccountUseCase,
    private readonly removeAccountUseCase: RemoveAccountUseCase,
    private readonly findUsersByAccountUseCase: FindUsersByAccountUseCase,
    private readonly tenantsService: TenantsService,
    private readonly usersService: UsersService
  ) {}

  async create(createAccountRequestDto: RequestCreateAccountDto): Promise<{ account: any; users: any; tenant: any }> {
    const { name, subdomain, email, phone, password } = createAccountRequestDto;

    // Criar o tenant
    const tenant = await this.tenantsService.create({ subdomain });

    // Criar a conta
    const account = await this.createAccountUseCase.execute({
      name,
      email,
      tenant_id: tenant.id,
      phone,
    });

    // Criar o usuário
    const users = await this.usersService.create({
      name,
      email,
      phone,
      password,
    });

    // Associar usuário à conta
    await this.prisma.accounts_users.create({
      data: {
        account_id: account.id,
        user_id: users.id,
        is_owner: 1,
      },
    });

    return { account, users, tenant };
  }

  async findAll(): Promise<any> {
    return this.findAllAccountsUseCase.execute();
  }

  async findOne(id: number): Promise<any> {
    return this.findOneAccountUseCase.execute(id);
  }

  async update(id: number, updateAccountDto: UpdateAccountDto): Promise<any> {
    return this.updateAccountUseCase.execute(id, updateAccountDto);
  }

  async remove(id: number): Promise<any> {
    return this.removeAccountUseCase.execute(id);
  }

  async findUsersByAccount(accountId: number): Promise<any> {
    return this.findUsersByAccountUseCase.execute(accountId);
  }
}
