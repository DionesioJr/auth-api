import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { LoginUseCase } from './usecases/login.usecase';
import { LogoutUseCase } from './usecases/logout.usecase';
import { RefreshTokenUseCase } from './usecases/refresh-token.usecase';
import { ValidateTokenUseCase } from './usecases/validate-token.usecase';
import { RequestCreateAccountDto } from 'src/accounts/dto/request-create-account.dto';
import { AccountsService } from 'src/accounts/accounts.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly logoutUseCase: LogoutUseCase,
    private readonly refreshTokenUseCase: RefreshTokenUseCase,
    private readonly validateTokenUseCase: ValidateTokenUseCase,
    private readonly accountsService: AccountsService
  ) {}

  async login(loginDto: LoginDto, headers: Headers) {
    return this.loginUseCase.execute(loginDto, headers);
  }

  async signup(requestCreateAccountDto: RequestCreateAccountDto, headers: Headers) {
    const accountResult = await this.accountsService.create(requestCreateAccountDto);

    const dataLogin: LoginDto = { email: accountResult.email, password: accountResult.password };

    return this.login(dataLogin, headers);
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
