export class ResponseAccountDto {
  id: number;
  instance: string;
  name: string;
  email?: string;
  phone?: string;
  avatar_url?: string;
  is_active: boolean;
  is_deleted: boolean;
  created_at: Date;
  updated_at: Date;
}
