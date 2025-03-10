import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { AccountsModule } from './modules/accounts/accounts.module';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [UsersModule, AccountsModule, AuthModule, PrismaModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
