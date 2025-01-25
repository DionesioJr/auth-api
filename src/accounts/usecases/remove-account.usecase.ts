import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { ResponseAccountDto } from '../dto/response-account.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class RemoveAccountUseCase {
  constructor(private readonly prisma: PrismaService) {}

  private readonly logger = new Logger(RemoveAccountUseCase.name);

  async execute(id: number): Promise<ResponseAccountDto> {
    this.logger.log(`Removing account with ID: ${id}.`);

    const existingAccount = await this.prisma.accounts.findUnique({
      where: { id },
    });

    if (!existingAccount) {
      throw new NotFoundException(`Account with ID ${id} not found.`);
    }

    const deletedAccount = await this.prisma.accounts.update({
      where: { id },
      data: { is_deleted: true, is_active: false },
    });

    return plainToInstance(ResponseAccountDto, deletedAccount);
  }
}
