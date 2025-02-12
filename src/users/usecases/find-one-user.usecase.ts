import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ResponseUserDto } from '../dto/response-user.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class FindOneUserUseCase {
  constructor(private readonly prisma: PrismaService) {}

  private readonly logger = new Logger(FindOneUserUseCase.name);

  async execute(id: number): Promise<ResponseUserDto> {
    this.logger.log(`Fetching user with ID: ${id}.`);

    const user = await this.prisma.users.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    }

    return plainToInstance(ResponseUserDto, user);
  }
}
