import { IsString, IsOptional } from 'class-validator';

export class ValidateTokenDto {
  @IsString()
  token: string;

  @IsOptional()
  @IsString()
  ip_address?: string;

  @IsOptional()
  @IsString()
  user_agent?: string;
}
