import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/database/prisma.service';
import { ValidateTokenDto } from '../dto/validate-token.dto';

@Injectable()
export class ValidateTokenUseCase {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async execute(validateTokenDto: ValidateTokenDto): Promise<{ valid: boolean }> {
    try {
      this.jwtService.verify(validateTokenDto.token, { secret: process.env.JWT_SECRET });

      const existingKey = await this.prisma.users_access_keys.findFirst({
        where: { access_token: validateTokenDto.token, is_active: 1 },
      });

      if (!existingKey) {
        throw new UnauthorizedException('Token not found or inactive');
      }

      await this.prisma.users_access_keys.update({
        where: { id: existingKey.id },
        data: { last_used_at: new Date() },
      });

      if (
        (validateTokenDto.ip_address && validateTokenDto.ip_address !== existingKey.ip_address) ||
        (validateTokenDto.user_agent && validateTokenDto.user_agent !== existingKey.user_agent)
      ) {
        throw new UnauthorizedException('Token validation failed');
      }

      return { valid: true };
    } catch (error: unknown) {
      const err = error as Error;
      throw new UnauthorizedException({
        message: 'Invalid token',
        cause: err.message, // Garante que `err` seja tratado como uma string válida
      });
    }
  }
}
