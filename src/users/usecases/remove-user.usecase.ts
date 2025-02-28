import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ResponseUserDto } from '../dto/response-user.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class RemoveUserUseCase {
  constructor(private readonly prisma: PrismaService) {}

  private readonly logger = new Logger(RemoveUserUseCase.name);

  async execute(uuid: string): Promise<ResponseUserDto> {
    this.logger.log(`Removing user with UUID: ${uuid}.`);

    const existingUser = await this.prisma.users.findUnique({ where: { uuid } });

    if (!existingUser) {
      throw new NotFoundException(`User with UUID ${uuid} not found.`);
    }

    try {
      const user = await this.prisma.users.delete({ where: { uuid } });
      return plainToInstance(ResponseUserDto, user);
    } catch (error) {
      this.logger.error('Error occurred while removing user', error);
      throw error;
    }
  }
}
