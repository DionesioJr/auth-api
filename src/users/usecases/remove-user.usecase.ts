import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ResponseUserDto } from '../dto/response-user.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class RemoveUserUseCase {
  constructor(private readonly prisma: PrismaService) {}

  private readonly logger = new Logger(RemoveUserUseCase.name);

  async execute(id: number): Promise<ResponseUserDto> {
    this.logger.log(`Removing user with ID: ${id}.`);

    const existingUser = await this.prisma.users.findUnique({ where: { id } });

    if (!existingUser) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    }

    const user = await this.prisma.users.delete({ where: { id } });

    return plainToInstance(ResponseUserDto, user);
  }
}
