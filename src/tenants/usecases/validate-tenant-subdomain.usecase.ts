import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class ValidateTenantSubdomainUseCase {
  constructor(private readonly prisma: PrismaService) {}

  private readonly logger = new Logger(ValidateTenantSubdomainUseCase.name);

  async execute(subdomain: string): Promise<{ isAvailable: boolean }> {
    this.logger.log(`Validating subdomain: ${subdomain}.`);

    const existingTenant = await this.prisma.tenants.findUnique({
      where: { subdomain },
    });

    return { isAvailable: !existingTenant };
  }
}
