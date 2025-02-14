import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { UsersModule } from 'src/users/users.module';
import { AccountsController } from './accounts.controller';

import { CreateAccountUseCase } from './usecases/create-account.usecase';
import { FindAllAccountsUseCase } from './usecases/find-all-accounts.usecase';
import { FindOneAccountUseCase } from './usecases/find-one-account.usecase';
import { UpdateAccountUseCase } from './usecases/update-account.usecase';
import { RemoveAccountUseCase } from './usecases/remove-account.usecase';
import { ValidateInstanceUseCase } from './usecases/validate-instance.usecase';
import { FindAllAccountsByUserIdUseCase } from './usecases/find-all-accounts-by-user-id.usecase';
import { FindUsersByAccountUseCase } from 'src/accounts/usecases/find-users-by-account.usecase';
import { FindOneAccountByEmailUseCase } from './usecases/find-one-account-by-email.usecase';

@Module({
  imports: [UsersModule],
  controllers: [AccountsController],
  providers: [
    AccountsService,
    CreateAccountUseCase,
    FindAllAccountsUseCase,
    FindOneAccountUseCase,
    UpdateAccountUseCase,
    RemoveAccountUseCase,
    ValidateInstanceUseCase,
    FindAllAccountsByUserIdUseCase,
    FindUsersByAccountUseCase,
    FindOneAccountByEmailUseCase,
  ],
  exports: [AccountsService],
})
export class AccountsModule {}
