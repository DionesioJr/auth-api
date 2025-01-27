import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { ValidateTokenDto } from './dto/validate-token.dto';
import { LoginUseCase } from './usecases/login.usecase';
import { LogoutUseCase } from './usecases/logout.usecase';
import { RefreshTokenUseCase } from './usecases/refresh-token.usecase';
import { ValidateTokenUseCase } from './usecases/validate-token.usecase';

@Injectable()
export class AuthService {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly logoutUseCase: LogoutUseCase,
    private readonly refreshTokenUseCase: RefreshTokenUseCase,
    private readonly validateTokenUseCase: ValidateTokenUseCase,
  ) {}

  async login(loginDto: LoginDto, headers: Record<string, string>) {
    return this.loginUseCase.execute(loginDto, {
      'device-name': headers['device-name'],
      'user-agent': headers['user-agent'],
      ip: headers['x-forwarded-for'] || headers['remote-addr'] || 'Unknown',
    });
  }

  async logout(userId: number) {
    return this.logoutUseCase.execute(userId);
  }

  async refresh(refreshTokenDto: RefreshTokenDto, headers: Record<string, string>) {
    return this.refreshTokenUseCase.execute(refreshTokenDto, {
      ip: headers['x-forwarded-for'] || headers['remote-addr'] || 'Unknown',
      'user-agent': headers['user-agent'],
    });
  }

  async validate(validateTokenDto: ValidateTokenDto) {
    return this.validateTokenUseCase.execute(validateTokenDto);
  }
}
