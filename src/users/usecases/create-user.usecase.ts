import * as bcrypt from 'bcryptjs';
import { plainToInstance } from 'class-transformer';
import { randomBytes } from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import { Injectable, Logger, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { ResponseUserDto } from '../dto/response-user.dto';

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly prisma: PrismaService) {}

  private readonly logger = new Logger(CreateUserUseCase.name);

  async execute(createUserDto: CreateUserDto): Promise<ResponseUserDto> {
    this.logger.log('Creating a new user.');

    const { email } = createUserDto;

    // Verificar se o email já está em uso
    const existingUserByEmail = await this.prisma.users.findUnique({
      where: { email: email },
    });
    if (existingUserByEmail) {
      throw new ConflictException('Email already in use for another user.');
    }

    try {
      // Criar uma senha aleatória caso o usuário não forneça uma senha
      if (!createUserDto.password) {
        createUserDto.password = randomBytes(5).toString('hex');
      }
      const hashedPassword = bcrypt.hashSync(createUserDto.password, 10);

      // Criar o usuário vinculado à conta
      const user = await this.prisma.users.create({
        data: {
          ...createUserDto,
          uuid: uuidv4(),
          password: hashedPassword, // Substitui a senha pela versão criptografada
        },
      });

      // Transforma os dados para a resposta
      return plainToInstance(ResponseUserDto, user);
    } catch (error) {
      this.logger.error('Error occurred while creating user', error);
      throw new InternalServerErrorException('Failed to create user');
    }
  }
}
