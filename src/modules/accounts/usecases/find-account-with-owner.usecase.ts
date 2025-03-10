import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { plainToInstance } from 'class-transformer';
import { ResponseAccountDto } from '../dto/response-account.dto';

@Injectable()
export class FindAccountWithOwnerUseCase {
  constructor(private prisma: PrismaService) {}

  async execute(accountUuid: string): Promise<ResponseAccountDto | null> {
    const accountWithOwner = await this.prisma.accounts.findFirst({
      where: {
        uuid: accountUuid,
      },
      include: {
        account_users: {
          where: {
            role: 'owner',
          },
          include: {
            users: true,
          },
        },
      },
    });

    if (!accountWithOwner) {
      return null;
    }

    return plainToInstance(ResponseAccountDto, {
      id: accountWithOwner.id,
      uuid: accountWithOwner.uuid,
      instance: accountWithOwner.instance,
      name: accountWithOwner.name,
      email: accountWithOwner.email,
      phone: accountWithOwner.phone,
      avatarUrl: accountWithOwner.avatar_url,
      isActive: accountWithOwner.is_active,
      isDeleted: accountWithOwner.is_deleted,
      createdAt: accountWithOwner.created_at,
      updatedAt: accountWithOwner.updated_at,
      owner: accountWithOwner.account_users?.[0]?.users
        ? {
            id: accountWithOwner.account_users[0].users.id,
            uuid: accountWithOwner.account_users[0].users.uuid,
            name: accountWithOwner.account_users[0].users.name,
            email: accountWithOwner.account_users[0].users.email,
            avatarUrl: accountWithOwner.account_users[0].users.avatar_url,
          }
        : null,
    }) as ResponseAccountDto;
  }
}
