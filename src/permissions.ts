import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class PermissionsService {
  constructor(private readonly prisma: PrismaService) {}

  // Verifica se o usuário tem permissão para realizar uma ação em um recurso
  async can(userId: number, action: string, resource: string, instance: string): Promise<boolean> {
    const userRoles = await this.getUserRolesInAccount(userId, instance);

    if (!userRoles.length) return false;

    return userRoles.some((role) => this.hasPermission(role, action, resource));
  }

  // Verifica se o usuário NÃO tem permissão para realizar uma ação
  async cannot(userId: number, action: string, resource: string, instance: string): Promise<boolean> {
    return !(await this.can(userId, action, resource, instance));
  }

  // Verifica se o usuário tem um papel (owner, admin, member) na conta com a instance específica
  async getUserRolesInAccount(userId: number, instance: string): Promise<string[]> {
    const user = await this.prisma.users.findUnique({
      where: { id: userId },
      include: {
        accounts_users: {
          where: {
            user_id: userId,
            accounts: {
              instance: instance, // Filtra pela conta com a instance fornecida
            },
          },
        },
      },
    });

    if (!user) return [];

    // Retorna os papéis dos usuários nessa conta
    return user.accounts_users.map((au) => au.role);
  }

  // Verifica se o papel tem permissão para realizar a ação em um recurso
  private hasPermission(role: string, action: string, resource: string): boolean {
    const permissionsMap = {
      owner: {
        account: ['create', 'update', 'delete', 'view'],
        user: ['create', 'update', 'delete', 'view'],
      },
      admin: {
        account: ['update', 'view'],
        user: ['create', 'update', 'view'],
      },
      member: {
        account: ['view'],
        user: ['view'],
      },
    };

    // Validação dos parâmetros role e resource
    if (!permissionsMap[role]) {
      return false;
    }

    const permissions = permissionsMap[role][resource];

    if (!permissions) {
      return false;
    }

    return permissions.includes(action);
  }
}
