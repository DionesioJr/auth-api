import { IsEmail, IsOptional, IsString, IsInt, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';

export class ResponseUserDto {
  @IsInt()
  id: number;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  first_name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  last_name?: string;

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

  @IsInt()
  is_active: number;

  @IsInt()
  is_deleted: number;

  @Type(() => Date)
  created_at: Date;

  @Type(() => Date)
  updated_at: Date;
}
