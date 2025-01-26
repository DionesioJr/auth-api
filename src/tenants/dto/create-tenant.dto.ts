import { IsBoolean, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateTenantDto {
  @IsOptional()
  @IsString()
  @MaxLength(255)
  name?: string;

  @IsString()
  @MaxLength(255)
  subdomain: string;

  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
}
