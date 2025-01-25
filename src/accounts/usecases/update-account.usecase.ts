import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { UpdateAccountDto } from '../dto/update-account.dto';
import { ResponseAccountDto } from '../dto/response-account.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UpdateAccountUseCase {
  constructor(private readonly prisma: PrismaService) {}

  private readonly logger = new Logger(UpdateAccountUseCase.name);

  async execute(
    id: number,
    updateAccountDto: UpdateAccountDto,
  ): Promise<ResponseAccountDto> {
    this.logger.log(`Updating account with ID: ${id}.`);

    const existingAccount = await this.prisma.accounts.findUnique({
      where: { id },
    });

    if (!existingAccount) {
      throw new NotFoundException(`Account with ID ${id} not found.`);
    }

    const updatedAccount = await this.prisma.accounts.update({
      where: { id },
      data: updateAccountDto,
    });

    return plainToInstance(ResponseAccountDto, updatedAccount);
  }
}
