import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ResponseUserDto } from '../dto/response-user.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class FindUserByEmailUseCase {
  constructor(private readonly prisma: PrismaService) {}

  private readonly logger = new Logger(FindUserByEmailUseCase.name);

  async execute(email: string): Promise<ResponseUserDto> {
    this.logger.log(`Fetching user with email: ${email}.`);

    const user = await this.prisma.users.findUnique({ where: { email } });

    if (!user) {
      throw new NotFoundException(`User with email ${email} not found.`);
    }

    return plainToInstance(ResponseUserDto, user);
  }
}
