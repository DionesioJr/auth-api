import * as bcrypt from 'bcryptjs';
import { Injectable, Logger, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from '../dto/update-user.dto';
import { ResponseUserDto } from '../dto/response-user.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UpdateUserUseCase {
  constructor(private readonly prisma: PrismaService) {}

  private readonly logger = new Logger(UpdateUserUseCase.name);

  async execute(id: number, updateUserDto: UpdateUserDto): Promise<ResponseUserDto> {
    this.logger.log(`Updating user with ID: ${id}.`);

    // Verificar se o usuário existe
    const existingUser = await this.prisma.users.findUnique({ where: { id } });
    if (!existingUser) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    }

    // Verificar se o email já existe
    if (updateUserDto.email && updateUserDto.email !== existingUser.email) {
      const existingUserByEmail = await this.prisma.users.findUnique({
        where: { email: updateUserDto.email },
      });
      if (existingUserByEmail) {
        throw new ConflictException('Email already in use for another user.');
      }
    }

    // Se a senha foi fornecida, criptografar a nova senha
    const updatedData = { ...updateUserDto };

    if (updateUserDto.password) {
      const hashedPassword = await bcrypt.hash(updateUserDto.password, 10);
      updatedData.password = hashedPassword; // Substitui a senha pela versão criptografada
    }

    try {
      // Atualizar o usuário no banco de dados
      const user = await this.prisma.users.update({
        where: { id },
        data: updatedData, // Dados atualizados com a senha criptografada (se foi fornecida)
      });

      return plainToInstance(ResponseUserDto, user);
    } catch (error) {
      this.logger.error('Error occurred while updating user', error);
      throw error; // Lançar erro para ser tratado pela camada superior
    }
  }
}
