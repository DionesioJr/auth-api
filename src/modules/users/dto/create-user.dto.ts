import { IsEmail, IsOptional, IsString, IsInt, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateUserDto {
  @IsString({ message: 'O nome deve ser uma string' })
  @MaxLength(255, { message: 'O nome deve ter no máximo 255 caracteres' })
  name: string;

  @IsOptional()
  @IsString({ message: 'O UUID deve ser uma string' })
  @MaxLength(36, { message: 'O UUID deve ter no máximo 36 caracteres' })
  uuid: string;

  @IsEmail({}, { message: 'O e-mail deve ser um endereço válido' })
  @MaxLength(255, { message: 'O e-mail deve ter no máximo 255 caracteres' })
  email: string;

  @IsOptional()
  @Type(() => Date)
  emailVerifiedAt?: Date;

  @IsOptional()
  @IsString({ message: 'A senha deve ser uma string' })
  password?: string;

  @IsOptional()
  @IsString({ message: 'O telefone deve ser uma string' })
  @MaxLength(15, { message: 'O telefone deve ter no máximo 15 caracteres' })
  phone?: string;

  @IsOptional()
  @IsString({ message: 'A URL do avatar deve ser uma string' })
  avatarUrl?: string;

  @IsOptional()
  @IsInt({ message: 'O status ativo deve ser um número inteiro' })
  isActive?: number;

  @IsOptional()
  @IsInt({ message: 'O status deletado deve ser um número inteiro' })
  isDeleted?: number;

  @IsOptional()
  @IsString({ message: 'O proprietário deve ser uma string' })
  owner?: string;
}
