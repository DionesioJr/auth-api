import { IsEmail, IsOptional, IsString, MaxLength } from 'class-validator';

export class RequestCreateAccountDto {
  @IsString()
  @MaxLength(255)
  instance: string;

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
  avatar_url?: string;

  @IsOptional()
  @IsString()
  password: string;
}
