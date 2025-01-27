import { IsBoolean, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateTenantDto {
  @IsString()
  @MaxLength(255)
  subdomain: string;

  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
}
