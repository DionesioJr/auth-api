import { Module } from '@nestjs/common';
import { PrismaService } from './database/prisma.service';
import { UsersModule } from './users/users.module';
import { AccountsModule } from './accounts/accounts.module';
import { TenantsModule } from './tenants/tenants.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, AccountsModule, TenantsModule, AuthModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
