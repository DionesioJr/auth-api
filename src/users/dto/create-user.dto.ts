import { IsEmail, IsOptional, IsString, IsInt, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateUserDto {
  @IsString()
  @MaxLength(255)
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(36)
  uuid: string;

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
  avatar_url?: string;

  @IsOptional()
  @IsInt()
  is_active?: number;

  @IsOptional()
  @IsInt()
  is_deleted?: number;

  @IsOptional()
  @IsString()
  owner?: string;
}
