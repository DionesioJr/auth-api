import { IsBoolean, IsInt, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateTenantDto {
  @IsOptional()
  @IsString()
  @MaxLength(255)
  name?: string;

  @IsString()
  @MaxLength(255)
  subdomain: string;

  @IsString()
  @MaxLength(255)
  database_name: string;

  @IsString()
  @MaxLength(255)
  database_user: string;

  @IsString()
  @MaxLength(255)
  database_password: string;

  @IsString()
  @MaxLength(255)
  database_host: string;

  @IsInt()
  database_port: number;

  @IsBoolean()
  is_active: boolean;
}
