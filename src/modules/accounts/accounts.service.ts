import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';

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
import { FindAccountWithOwnerUseCase } from './usecases/find-account-with-owner.usecase';

// Services
import { UsersService } from 'src/modules/users/users.service';
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
    private readonly findAccountWithOwnerUseCase: FindAccountWithOwnerUseCase,

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
    const { name, instance, email, phone, password, avatarUrl } = createAccountRequestDto;

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
      uuid: uuidv4(),
      name,
      email,
      phone,
      instance,
      avatarUrl,
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
        uuid: uuidv4(),
        name,
        email,
        phone,
        password,
        avatarUrl,
      });
    }
    // Associar usuário à conta
    await this.prisma.account_users.create({
      data: {
        account_id: account.id,
        user_id: user.id,
        role: 'owner',
      },
    });
    return { user_id: user.uuid, name, instance, email, phone, password };
  }

  async findAll(): Promise<any> {
    return this.findAllAccountsUseCase.execute();
  }

  async findOne(uuid: string): Promise<any> {
    return this.findOneAccountUseCase.execute(uuid);
  }

  async update(uuid: string, updateAccountDto: UpdateAccountDto): Promise<any> {
    return this.updateAccountUseCase.execute(uuid, updateAccountDto);
  }

  async remove(uuid: string): Promise<any> {
    return this.removeAccountUseCase.execute(uuid);
  }

  async findUsersByAccount(accountUuid: string): Promise<any> {
    return this.findUsersByAccountUseCase.execute(accountUuid);
  }

  async findAllAccountsByUserId(userUuid: string): Promise<any> {
    return this.findAllAccountsByUserIdUseCase.execute(userUuid);
  }

  async findOneAccountByEmail(email: string): Promise<any> {
    return this.findOneAccountByEmailUseCase.execute(email);
  }

  async findAccountWithOwner(userUuid: string): Promise<any> {
    return this.findAccountWithOwnerUseCase.execute(userUuid);
  }
}
