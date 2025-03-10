import { Injectable, Logger, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ReservedInstances } from '../reserved-instances';

@Injectable()
export class ValidateInstanceUseCase {
  constructor(private readonly prisma: PrismaService) {}

  private readonly logger = new Logger(ValidateInstanceUseCase.name);

  async execute(instance: string): Promise<{ isAvailable: boolean }> {
    this.logger.log(`Validating instance: ${instance}.`);

    try {
      // Verifica se o subdomínio está na lista de reservados
      if (ReservedInstances.includes(instance)) {
        this.logger.warn(`Instance '${instance}' is reserved.`);
        return { isAvailable: false };
      }

      // Verifica se o subdomínio já existe no banco de dados
      const existingInstace = await this.prisma.accounts.findUnique({
        where: { instance },
      });

      // Retorna a disponibilidade do subdomínio
      const isAvailable = !existingInstace;
      this.logger.log(`Instance '${instance}' is ${isAvailable ? 'available' : 'not available'}.`);
      return { isAvailable };
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.logger.error(`Error while validating instance: ${error.message}`, error.stack);
      } else {
        this.logger.error(`Unexpected error: ${JSON.stringify(error)}`);
      }
      throw new InternalServerErrorException('Error while validating instance');
    }
  }
}
