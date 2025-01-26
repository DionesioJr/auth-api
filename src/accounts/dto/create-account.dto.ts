import { IsEmail, IsInt, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateAccountDto {
  @IsInt()
  tenant_id: number;

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
}
