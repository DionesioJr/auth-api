import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class LogoutUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(userId: number): Promise<void> {
    await this.prisma.users_access_keys.updateMany({ where: { user_id: userId }, data: { is_active: 0 } });
  }
}
