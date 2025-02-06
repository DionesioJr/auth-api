export interface IPayload {
  sub: number;
  subdomain: string[];
  email: string;
  ip: string;
  device: string;
  user_agent: string;
}
