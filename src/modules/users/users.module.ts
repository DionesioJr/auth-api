import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

import { CreateUserUseCase } from './usecases/create-user.usecase';
import { FindAllUsersUseCase } from './usecases/find-all-users.usecase';
import { FindOneUserUseCase } from './usecases/find-one-user.usecase';
import { UpdateUserUseCase } from './usecases/update-user.usecase';
import { RemoveUserUseCase } from './usecases/remove-user.usecase';
import { FindUserByEmailUseCase } from './usecases/find-user-by-email.usecase';
import { FindUsersByAccountUseCase } from '../accounts/usecases/find-users-by-account.usecase';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    CreateUserUseCase,
    FindAllUsersUseCase,
    FindOneUserUseCase,
    UpdateUserUseCase,
    RemoveUserUseCase,
    FindUserByEmailUseCase,
    FindUsersByAccountUseCase,
  ],
  exports: [UsersService],
})
export class UsersModule {}
