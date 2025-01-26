import { IsEmail, IsOptional, IsString, IsInt, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateUserDto {
  @IsString()
  @MaxLength(255)
  name: string;

  @IsEmail()
  @MaxLength(255)
  email: string;

  @IsOptional()
  @Type(() => Date)
  email_verified_at?: Date;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsString()
  @MaxLength(15)
  phone?: string;

  @IsOptional()
  @IsString()
  avatar?: string;

  @IsOptional()
  @IsInt()
  is_active?: number;

  @IsOptional()
  @IsInt()
  is_deleted?: number;

  @IsOptional()
  @IsInt()
  is_owner?: number; // Define se o usuário será proprietário da conta (1 para true)
}
