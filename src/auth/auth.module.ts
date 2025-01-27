import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/database/prisma.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LoginUseCase } from './usecases/login.usecase';
import { LogoutUseCase } from './usecases/logout.usecase';
import { RefreshTokenUseCase } from './usecases/refresh-token.usecase';
import { ValidateTokenUseCase } from './usecases/validate-token.usecase';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [PrismaService, AuthService, LoginUseCase, LogoutUseCase, RefreshTokenUseCase, ValidateTokenUseCase],
})
export class AuthModule {}
