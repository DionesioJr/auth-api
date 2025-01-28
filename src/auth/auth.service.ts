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
    private readonly validateTokenUseCase: ValidateTokenUseCase,
  ) {}

  async login(loginDto: LoginDto, headers: Record<string, string>) {
    return this.loginUseCase.execute(loginDto, headers);
  }

  async logout(userId: number) {
    return this.logoutUseCase.execute(userId);
  }

  async refresh(headers: Record<string, string>) {
    return this.refreshTokenUseCase.execute(headers);
  }

  async validate(headers: Record<string, string>) {
    return this.validateTokenUseCase.execute(headers);
  }
}
