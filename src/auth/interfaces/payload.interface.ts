export interface IPayload {
  sub: number;
  instance?: string;
  email: string;
  ip: string;
  device: string;
  user_agent: string;
}
