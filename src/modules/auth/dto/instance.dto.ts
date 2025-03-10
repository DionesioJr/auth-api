import { IsString } from 'class-validator';

export class InstanceDto {
  @IsString({ message: 'A instância deve ser uma string' })
  instance: string;
}
