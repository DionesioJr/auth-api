import { IsEmail, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateAccountDto {
  @IsString()
  @MaxLength(255)
  name: string;

  @IsOptional()
  @IsEmail()
  @MaxLength(255)
  email?: string;

  @IsOptional()
  @IsString()
  @MaxLength(15)
  phone?: string;

  @IsOptional()
  @IsString()
  logo?: string;
}
