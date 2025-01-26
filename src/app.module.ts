import { Module } from '@nestjs/common';
import { PrismaService } from './database/prisma.service';
import { UsersModule } from './users/users.module';
import { AccountsModule } from './accounts/accounts.module';
import { TenantsModule } from './tenants/tenants.module';

@Module({
  imports: [UsersModule, AccountsModule, TenantsModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
