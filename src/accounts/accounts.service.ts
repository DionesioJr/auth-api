import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

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
import { UsersService } from 'src/users/users.service';
import { FindAllAccountsByUserIdUseCase } from './usecases/find-all-accounts-by-user-id.usecase';
import { FindOneAccountByEmailUseCase } from './usecases/find-one-account-by-email.usecase';

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
    private readonly findAllAccountsByUserIdUseCase: FindAllAccountsByUserIdUseCase,
    private readonly findOneAccountByEmailUseCase: FindOneAccountByEmailUseCase,

    private readonly usersService: UsersService
  ) {}

  async create(createAccountRequestDto: RequestCreateAccountDto): Promise<{
    user_id: number;
    name: string;
    instance: string;
    email: string;
    phone?: string;
    avatar_url?: string;
    password: string;
  }> {
    const { name, instance, email, phone, password, avatar_url } = createAccountRequestDto;

    // Verifica se o e-mail já está em uso por outra conta
    let emailExists;
    try {
      emailExists = await this.findOneAccountByEmailUseCase.execute(email);
    } catch (error) {
      if (error instanceof NotFoundException) {
        emailExists = null;
      } else {
        throw new InternalServerErrorException('Error validating email.');
      }
    }

    if (emailExists) {
      throw new ConflictException(`Email ${email} is already in use.`);
    }

    // Criar a conta
    const account = await this.createAccountUseCase.execute({
      name,
      email,
      phone,
      instance,
      avatar_url,
    });

    let user;
    try {
      user = await this.usersService.findOneByEmail(email);
    } catch (error) {
      if (error instanceof NotFoundException) {
        user = null;
      }
    }

    if (!user) {
      // Criar o usuário
      user = await this.usersService.create({
        name,
        email,
        phone,
        password,
        avatar_url,
      });
    }
    // Associar usuário à conta
    await this.prisma.accounts_users.create({
      data: {
        account_id: account.id,
        user_id: user.id,
        role: 'owner',
      },
    });
    return { user_id: user.id, name, instance, email, phone, password };
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

  async findAllAccountsByUserId(userId: number): Promise<any> {
    return this.findAllAccountsByUserIdUseCase.execute(userId);
  }

  async findOneAccountByEmail(email: string): Promise<any> {
    return this.findOneAccountByEmailUseCase.execute(email);
  }
}
