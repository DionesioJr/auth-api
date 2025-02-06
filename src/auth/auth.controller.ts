import { Controller, Post, Body, Headers } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RequestCreateAccountDto } from 'src/accounts/dto/request-create-account.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  login(@Body() loginDto: LoginDto, @Headers() headers: Headers) {
    return this.authService.login(loginDto, headers);
  }

  @Post('signup')
  signup(@Body() requestCreateAccountDto: RequestCreateAccountDto, @Headers() headers: Headers) {
    return this.authService.signup(requestCreateAccountDto, headers);
  }

  @Post('signout')
  logout(@Headers() headers: Headers) {
    return this.authService.logout(headers);
  }

  @Post('refresh')
  refresh(@Headers() headers: Headers) {
    return this.authService.refresh(headers);
  }

  @Post('validate')
  validate(@Headers() headers: Headers) {
    return this.authService.validate(headers);
  }
}
