import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { plainToInstance } from 'class-transformer';
import { ResponseUserDto } from 'src/users/dto/response-user.dto';

@Injectable()
export class FindUsersByAccountUseCase {
  constructor(private readonly prisma: PrismaService) {}

  private readonly logger = new Logger(FindUsersByAccountUseCase.name);

  async execute(accountId: number): Promise<ResponseUserDto[]> {
    this.logger.log(`Fetching users for account ID: ${accountId}.`);

    const account = await this.prisma.accounts.findUnique({
      where: { id: accountId },
    });

    if (!account) {
      throw new NotFoundException(`Account with ID ${accountId} not found.`);
    }

    const users = await this.prisma.users.findMany({
      where: { accounts_users: { some: { account_id: accountId } } },
    });

    return plainToInstance(ResponseUserDto, users);
  }
}
