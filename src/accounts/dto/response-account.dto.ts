export class ResponseAccountDto {
  id: number;
  tenant_id: number;
  name: string;
  email?: string;
  phone?: string;
  logo?: string;
  is_active: boolean;
  is_deleted: boolean;
  created_at: Date;
  updated_at: Date;
}
