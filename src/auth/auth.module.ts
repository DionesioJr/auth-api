import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/database/prisma.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LoginUseCase } from './usecases/login.usecase';
import { LogoutUseCase } from './usecases/logout.usecase';
import { RefreshTokenUseCase } from './usecases/refresh-token.usecase';
import { ValidateTokenUseCase } from './usecases/validate-token.usecase';
import { UsersModule } from 'src/users/users.module';
import { GenerateTokensUseCase } from './usecases/generate-tokens.usecase';
import { AccountsModule } from 'src/accounts/accounts.module';
import { TenantsModule } from 'src/tenants/tenants.module';

@Module({
  imports: [
    UsersModule,
    AccountsModule,
    TenantsModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    PrismaService,
    AuthService,
    LoginUseCase,
    LogoutUseCase,
    RefreshTokenUseCase,
    ValidateTokenUseCase,
    GenerateTokensUseCase,
  ],
  exports: [AuthService],
})
export class AuthModule {}
