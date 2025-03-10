import { IsEmail, IsInt, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateAccountDto {
  @IsInt({ message: 'A instância deve ser um número inteiro' })
  @MaxLength(255, { message: 'A instância deve ter no máximo 255 caracteres' })
  instance: string;

  @IsString({ message: 'O nome deve ser uma string' })
  @MaxLength(255, { message: 'O nome deve ter no máximo 255 caracteres' })
  name: string;

  @IsString({ message: 'O UUID deve ser uma string' })
  @MaxLength(36, { message: 'O UUID deve ter no máximo 36 caracteres' })
  uuid: string;

  @IsEmail({}, { message: 'O e-mail deve ser um endereço válido' })
  @MaxLength(255, { message: 'O e-mail deve ter no máximo 255 caracteres' })
  email: string;

  @IsOptional()
  @IsString({ message: 'O telefone deve ser uma string' })
  @MaxLength(15, { message: 'O telefone deve ter no máximo 15 caracteres' })
  phone?: string;

  @IsOptional()
  @IsString({ message: 'A URL do avatar deve ser uma string' })
  avatarUrl?: string;
}
