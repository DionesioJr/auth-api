import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserUseCase } from './usecases/create-user.usecase';
import { FindAllUsersUseCase } from './usecases/find-all-users.usecase';
import { FindOneUserUseCase } from './usecases/find-one-user.usecase';
import { UpdateUserUseCase } from './usecases/update-user.usecase';
import { RemoveUserUseCase } from './usecases/remove-user.usecase';
import { ResponseUserDto } from './dto/response-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly findAllUsersUseCase: FindAllUsersUseCase,
    private readonly findOneUserUseCase: FindOneUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly removeUserUseCase: RemoveUserUseCase,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<ResponseUserDto> {
    return this.createUserUseCase.execute(createUserDto);
  }

  async findAll(): Promise<ResponseUserDto[]> {
    return this.findAllUsersUseCase.execute();
  }

  async findOne(id: number): Promise<ResponseUserDto> {
    return this.findOneUserUseCase.execute(id);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<ResponseUserDto> {
    return this.updateUserUseCase.execute(id, updateUserDto);
  }

  async remove(id: number): Promise<ResponseUserDto> {
    return this.removeUserUseCase.execute(id);
  }
}
