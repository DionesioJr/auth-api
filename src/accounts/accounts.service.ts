import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { CreateAccountUseCase } from './usecases/create-account.usecase';
import { FindAllAccountsUseCase } from './usecases/find-all-accounts.usecase';
import { FindOneAccountUseCase } from './usecases/find-one-account.usecase';
import { UpdateAccountUseCase } from './usecases/update-account.usecase';
import { RemoveAccountUseCase } from './usecases/remove-account.usecase';
import { FindUsersByAccountUseCase } from './usecases/find-users-by-account.usecase';

@Injectable()
export class AccountsService {
  constructor(
    private readonly createAccountUseCase: CreateAccountUseCase,
    private readonly findAllAccountsUseCase: FindAllAccountsUseCase,
    private readonly findOneAccountUseCase: FindOneAccountUseCase,
    private readonly updateAccountUseCase: UpdateAccountUseCase,
    private readonly removeAccountUseCase: RemoveAccountUseCase,
    private readonly findUsersByAccountUseCase: FindUsersByAccountUseCase,
  ) {}

  async create(createAccountDto: CreateAccountDto) {
    return this.createAccountUseCase.execute(createAccountDto);
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
