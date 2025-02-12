import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AccountsModule } from './accounts/accounts.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [UsersModule, AccountsModule, AuthModule, PrismaModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
