import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { plainToInstance } from 'class-transformer';
import { ResponseAccountDto } from '../dto/response-account.dto';

@Injectable()
export class FindAllAccountsByUserIdUseCase {
  constructor(private prisma: PrismaService) {}

  async execute(userUuid: string): Promise<ResponseAccountDto[]> {
    const userAccounts = await this.prisma.account_users.findMany({
      where: {
        users: {
          uuid: userUuid,
        },
      },
      include: {
        accounts: true,
      },
    });

    const instances = userAccounts.map((userAccount) => ({
      id: userAccount.accounts.id,
      uuid: userAccount.accounts.uuid,
      instance: userAccount.accounts.instance,
      name: userAccount.accounts.name,
      email: userAccount.accounts.email,
      phone: userAccount.accounts.phone,
      avatarUrl: userAccount.accounts.avatar_url,
      isActive: userAccount.accounts.is_active,
      isDeleted: userAccount.accounts.is_deleted,
      createdAt: userAccount.accounts.created_at,
      updatedAt: userAccount.accounts.updated_at,
    }));

    return instances.map((instance) => plainToInstance(ResponseAccountDto, instance));
  }
}
