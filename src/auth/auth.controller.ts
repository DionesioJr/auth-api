import { Controller, Post, Body, Headers } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { ValidateTokenDto } from './dto/validate-token.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() loginDto: LoginDto, @Headers() headers: Record<string, string>) {
    return this.authService.login(loginDto, headers);
  }

  @Post('logout')
  logout(@Body('userId') userId: number) {
    return this.authService.logout(userId);
  }

  @Post('refresh')
  refresh(@Body() refreshTokenDto: RefreshTokenDto, @Headers() headers: Record<string, string>) {
    return this.authService.refresh(refreshTokenDto, headers);
  }

  @Post('validate')
  validate(@Body() validateTokenDto: ValidateTokenDto) {
    return this.authService.validate(validateTokenDto);
  }
}
