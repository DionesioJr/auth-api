import { Controller, Post, Body, Headers } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() loginDto: LoginDto, @Headers() headers: Record<string, string>) {
    return this.authService.login(loginDto, headers);
  }

  @Post('logout')
  logout(@Headers() headers: Record<string, string>) {
    return this.authService.logout(headers);
  }

  @Post('refresh')
  refresh(@Headers() headers: Record<string, string>) {
    return this.authService.refresh(headers);
  }

  @Post('validate')
  validate(@Headers() headers: Record<string, string>) {
    return this.authService.validate(headers);
  }
}
