import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { UpdateAccountDto } from '../dto/update-account.dto';
import { plainToInstance } from 'class-transformer';
import { ResponseAccountDto } from '../dto/response-account.dto';

@Injectable()
export class UpdateAccountUseCase {
  constructor(private prisma: PrismaService) {}

  async execute(uuid: string, updateAccountDto: UpdateAccountDto): Promise<ResponseAccountDto> {
    // Verificar se a conta existe
    const accountExists = await this.prisma.accounts.findUnique({
      where: { uuid },
    });

    if (!accountExists) {
      throw new NotFoundException(`Conta com UUID ${uuid} não encontrada`);
    }

    // Atualizar a conta
    const updatedAccount = await this.prisma.accounts.update({
      where: { uuid },
      data: {
        name: updateAccountDto.name,
        email: updateAccountDto.email,
        phone: updateAccountDto.phone,
        avatar_url: updateAccountDto.avatarUrl,
        // Outros campos que podem ser atualizados
      },
    });

    return plainToInstance(ResponseAccountDto, {
      id: updatedAccount.id,
      uuid: updatedAccount.uuid,
      instance: updatedAccount.instance,
      name: updatedAccount.name,
      email: updatedAccount.email,
      phone: updatedAccount.phone,
      avatarUrl: updatedAccount.avatar_url,
      isActive: updatedAccount.is_active,
      isDeleted: updatedAccount.is_deleted,
      createdAt: updatedAccount.created_at,
      updatedAt: updatedAccount.updated_at,
    });
  }
}
