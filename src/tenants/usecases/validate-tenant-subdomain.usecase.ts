import { Injectable, Logger, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { ReservedSubdomains } from '../reserved-subdomains';

@Injectable()
export class ValidateTenantSubdomainUseCase {
  constructor(private readonly prisma: PrismaService) {}

  private readonly logger = new Logger(ValidateTenantSubdomainUseCase.name);

  async execute(subdomain: string): Promise<{ isAvailable: boolean }> {
    this.logger.log(`Validating subdomain: ${subdomain}.`);

    try {
      // Verifica se o subdomínio está na lista de reservados
      if (ReservedSubdomains.includes(subdomain)) {
        this.logger.warn(`Subdomain '${subdomain}' is reserved.`);
        return { isAvailable: false };
      }

      // Verifica se o subdomínio já existe no banco de dados
      const existingTenant = await this.prisma.tenants.findUnique({
        where: { subdomain },
      });

      // Retorna a disponibilidade do subdomínio
      const isAvailable = !existingTenant;
      this.logger.log(`Subdomain '${subdomain}' is ${isAvailable ? 'available' : 'not available'}.`);
      return { isAvailable };
    } catch (error) {
      this.logger.error(`Error while validating subdomain: ${error.message}`, error.stack);
      throw new InternalServerErrorException('Error while validating subdomain');
    }
  }
}
