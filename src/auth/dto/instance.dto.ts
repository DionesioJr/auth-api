import { IsString } from 'class-validator';

export class InstanceDto {
  @IsString()
  instance: string;
}
