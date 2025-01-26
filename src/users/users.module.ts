import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

import { PrismaService } from 'src/database/prisma.service';

import { CreateUserUseCase } from './usecases/create-user.usecase';
import { FindAllUsersUseCase } from './usecases/find-all-users.usecase';
import { FindOneUserUseCase } from './usecases/find-one-user.usecase';
import { UpdateUserUseCase } from './usecases/update-user.usecase';
import { RemoveUserUseCase } from './usecases/remove-user.usecase';

@Module({
  controllers: [UsersController],
  providers: [
    PrismaService,
    UsersService,
    CreateUserUseCase,
    FindAllUsersUseCase,
    FindOneUserUseCase,
    UpdateUserUseCase,
    RemoveUserUseCase,
  ],
  exports: [UsersService],
})
export class UsersModule {}
