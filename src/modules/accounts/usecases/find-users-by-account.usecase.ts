import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { plainToInstance } from 'class-transformer';
import { ResponseUserDto } from '../../users/dto/response-user.dto';

@Injectable()
export class FindUsersByAccountUseCase {
  constructor(private readonly prisma: PrismaService) {}

  private readonly logger = new Logger(FindUsersByAccountUseCase.name);

  async execute(accountUuid: string): Promise<ResponseUserDto[]> {
    this.logger.log(`Fetching users for account UUID: ${accountUuid}.`);

    const account = await this.prisma.accounts.findUnique({
      where: { uuid: accountUuid },
    });

    if (!account) {
      throw new NotFoundException(`Account with UUID ${accountUuid} not found.`);
    }

    const users = await this.prisma.users.findMany({
      where: {
        account_users: {
          some: {
            accounts: {
              uuid: accountUuid,
            },
          },
        },
      },
    });

    return users.map((user) => plainToInstance(ResponseUserDto, user));
  }
}
