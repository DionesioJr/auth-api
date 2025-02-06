import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { CreateAccountUseCase } from './usecases/create-account.usecase';
import { FindAllAccountsUseCase } from './usecases/find-all-accounts.usecase';
import { FindOneAccountUseCase } from './usecases/find-one-account.usecase';
import { UpdateAccountUseCase } from './usecases/update-account.usecase';
import { RemoveAccountUseCase } from './usecases/remove-account.usecase';
import { FindUsersByAccountUseCase } from './usecases/find-users-by-account.usecase';
import { TenantsModule } from 'src/tenants/tenants.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TenantsModule, UsersModule],
  controllers: [AccountsController],
  providers: [
    PrismaService,
    AccountsService,
    CreateAccountUseCase,
    FindAllAccountsUseCase,
    FindOneAccountUseCase,
    UpdateAccountUseCase,
    RemoveAccountUseCase,
    FindUsersByAccountUseCase,
  ],
  exports: [AccountsService],
})
export class AccountsModule {}
