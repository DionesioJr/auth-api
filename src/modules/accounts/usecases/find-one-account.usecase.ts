import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { plainToInstance } from 'class-transformer';
import { ResponseAccountDto } from '../dto/response-account.dto';

@Injectable()
export class FindOneAccountUseCase {
  constructor(private prisma: PrismaService) {}

  async execute(uuid: string): Promise<ResponseAccountDto> {
    const account = await this.prisma.accounts.findUnique({
      where: { uuid },
    });

    if (!account) {
      throw new NotFoundException(`Conta com UUID ${uuid} não encontrada`);
    }

    return plainToInstance(ResponseAccountDto, {
      id: account.id,
      uuid: account.uuid,
      instance: account.instance,
      name: account.name,
      email: account.email,
      phone: account.phone,
      avatarUrl: account.avatar_url,
      isActive: account.is_active,
      isDeleted: account.is_deleted,
      createdAt: account.created_at,
      updatedAt: account.updated_at,
    });
  }
}
