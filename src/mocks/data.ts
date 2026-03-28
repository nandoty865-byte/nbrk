import type { UserRole, AuthUser } from '@/lib/auth';

type UserSeed = {
  password: string;
  profile: AuthUser;
};

const rolePermissions: Record<UserRole, string[]> = {
  admin: ['dashboard:view', 'users:view', 'users:create', 'users:edit', 'access-control:view', 'access-control:manage'],
  gestor: ['dashboard:view', 'users:view'],
  operacao: ['dashboard:view'],
  auditoria: ['dashboard:view'],
  atendimento: ['dashboard:view'],
};

export const users: Record<string, UserSeed> = {
  'admin@vistapro.local': {
    password: '123456',
    profile: {
      id: 'u_admin',
      name: 'Administrador VistaPro',
      email: 'admin@vistapro.local',
      role: 'admin',
      permissions: rolePermissions.admin,
    },
  },
  'gestor@vistapro.local': {
    password: '123456',
    profile: {
      id: 'u_gestor',
      name: 'Gestor Operacional',
      email: 'gestor@vistapro.local',
      role: 'gestor',
      permissions: rolePermissions.gestor,
    },
  },
  'operacao@vistapro.local': {
    password: '123456',
    profile: {
      id: 'u_operacao',
      name: 'Operação VistaPro',
      email: 'operacao@vistapro.local',
      role: 'operacao',
      permissions: rolePermissions.operacao,
    },
  },
  'auditoria@vistapro.local': {
    password: '123456',
    profile: {
      id: 'u_auditoria',
      name: 'Analista de Auditoria',
      email: 'auditoria@vistapro.local',
      role: 'auditoria',
      permissions: rolePermissions.auditoria,
    },
  },
  'atendimento@vistapro.local': {
    password: '123456',
    profile: {
      id: 'u_atendimento',
      name: 'Equipe de Atendimento',
      email: 'atendimento@vistapro.local',
      role: 'atendimento',
      permissions: rolePermissions.atendimento,
    },
  },
};

export const refreshStore = new Map<string, string>();
