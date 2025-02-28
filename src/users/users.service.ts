import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResponseUserDto } from './dto/response-user.dto';

import { CreateUserUseCase } from './usecases/create-user.usecase';
import { FindAllUsersUseCase } from './usecases/find-all-users.usecase';
import { FindOneUserUseCase } from './usecases/find-one-user.usecase';
import { UpdateUserUseCase } from './usecases/update-user.usecase';
import { RemoveUserUseCase } from './usecases/remove-user.usecase';
import { FindUserByEmailUseCase } from './usecases/find-user-by-email.usecase';
import { FindUsersByAccountUseCase } from '../accounts/usecases/find-users-by-account.usecase';

@Injectable()
export class UsersService {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly findAllUsersUseCase: FindAllUsersUseCase,
    private readonly findOneUserUseCase: FindOneUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly removeUserUseCase: RemoveUserUseCase,
    private readonly findUserByEmailUseCase: FindUserByEmailUseCase,
    private readonly findUsersByAccountUseCase: FindUsersByAccountUseCase
  ) {}

  async create(createUserDto: CreateUserDto): Promise<ResponseUserDto> {
    return this.createUserUseCase.execute(createUserDto);
  }

  async findAll(): Promise<ResponseUserDto[]> {
    return this.findAllUsersUseCase.execute();
  }

  async findOne(uuid: string): Promise<ResponseUserDto> {
    return this.findOneUserUseCase.execute(uuid);
  }

  async findOneByEmail(email: string): Promise<ResponseUserDto> {
    return this.findUserByEmailUseCase.execute(email);
  }

  async update(uuid: string, updateUserDto: UpdateUserDto): Promise<ResponseUserDto> {
    return this.updateUserUseCase.execute(uuid, updateUserDto);
  }

  async remove(uuid: string): Promise<ResponseUserDto> {
    return this.removeUserUseCase.execute(uuid);
  }

  async findUsersByAccount(accountId: number): Promise<any> {
    return this.findUsersByAccountUseCase.execute(accountId);
  }
}
