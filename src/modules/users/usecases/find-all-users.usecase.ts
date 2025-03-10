import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ResponseUserDto } from '../dto/response-user.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class FindAllUsersUseCase {
  constructor(private readonly prisma: PrismaService) {}

  private readonly logger = new Logger(FindAllUsersUseCase.name);

  async execute(): Promise<ResponseUserDto[]> {
    this.logger.log('Fetching all users.');

    const users = await this.prisma.users.findMany();

    return plainToInstance(ResponseUserDto, users);
  }
}
