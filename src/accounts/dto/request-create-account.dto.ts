import { IsEmail, IsOptional, IsString, MaxLength } from 'class-validator';

export class RequestCreateAccountDto {
  @IsString()
  subdomain: string;

  @IsString()
  @MaxLength(255)
  name: string;

  @IsEmail()
  @MaxLength(255)
  email: string;

  @IsOptional()
  @IsString()
  @MaxLength(15)
  phone?: string;

  @IsOptional()
  @IsString()
  logo?: string;

  @IsOptional()
  @IsString()
  password: string;
}
