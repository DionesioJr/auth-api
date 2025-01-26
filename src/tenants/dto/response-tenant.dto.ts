import { IsBoolean, IsInt, IsString, MaxLength } from 'class-validator';

export class ResponseTenantDto {
  @IsInt()
  id: number;

  @IsString()
  @MaxLength(255)
  name?: string;

  @IsString()
  @MaxLength(255)
  subdomain: string;

  @IsBoolean()
  is_active: boolean;

  created_at: Date;
  updated_at: Date;
}
