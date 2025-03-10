import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class RemoveAccountUseCase {
  constructor(private prisma: PrismaService) {}

  async execute(uuid: string): Promise<{ message: string }> {
    // Verificar se a conta existe
    const accountExists = await this.prisma.accounts.findUnique({
      where: { uuid },
    });

    if (!accountExists) {
      throw new NotFoundException(`Conta com UUID ${uuid} não encontrada`);
    }

    // Remover a conta (soft delete)
    await this.prisma.accounts.update({
      where: { uuid },
      data: {
        is_deleted: true,
        deleted_at: new Date(),
      },
    });

    return { message: 'Conta removida com sucesso' };
  }
}
