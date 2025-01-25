import * as bcrypt from 'bcrypt';
import {
  Injectable,
  Logger,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { ResponseUserDto } from '../dto/response-user.dto';
import { plainToInstance } from 'class-transformer';
import { randomBytes } from 'crypto';

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly prisma: PrismaService) {}

  private readonly logger = new Logger(CreateUserUseCase.name);

  async execute(createUserDto: CreateUserDto): Promise<ResponseUserDto> {
    this.logger.log('Creating a new user.');

    // Verificar se o email já está em uso
    const existingUserByEmail = await this.prisma.users.findUnique({
      where: { email: createUserDto.email },
    });
    if (existingUserByEmail) {
      throw new ConflictException('Email already in use');
    }

    // Verificar se o telefone já está em uso
    const existingUserByPhone = await this.prisma.users.findUnique({
      where: { phone: createUserDto.phone },
    });
    if (existingUserByPhone) {
      throw new ConflictException('Phone number already in use');
    }

    try {
      // criando uma senha caso o usuário não passe uma senha
      if (!createUserDto.password) {
        createUserDto.password = randomBytes(5).toString('hex');
      }
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

      // Criar o usuário com a senha criptografada
      const user = await this.prisma.users.create({
        data: {
          ...createUserDto, // Copia os dados do DTO
          password: hashedPassword, // Substitui a senha pela versão criptografada
        },
      });

      // Transforma os dados caso necessário
      const transformerData = {
        ...user,
      };

      return plainToInstance(ResponseUserDto, transformerData);
    } catch (error) {
      this.logger.error('Error occurred while creating user', error);
      throw new InternalServerErrorException('Failed to create user');
    }
  }
}
