import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
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
    private readonly validateTokenUseCase: ValidateTokenUseCase
  ) {}

  async login(loginDto: LoginDto, headers: Headers) {
    return this.loginUseCase.execute(loginDto, headers);
  }

  async logout(headers: Headers) {
    return this.logoutUseCase.execute(headers);
  }

  async refresh(headers: Headers) {
    return this.refreshTokenUseCase.execute(headers);
  }

  async validate(headers: Headers) {
    return this.validateTokenUseCase.execute(headers);
  }
}
