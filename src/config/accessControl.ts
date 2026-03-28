import type { AppModuleKey } from '@/config/appModules';
import type { UserRole } from '@/lib/auth';

type PermissionDefinition = {
  key: string;
  moduleKey: AppModuleKey;
  label: string;
  allowedRoles: UserRole[];
};

export const permissionDefinitions: PermissionDefinition[] = [
  { key: 'dashboard:view', moduleKey: 'dashboard', label: 'Ver dashboard', allowedRoles: ['admin', 'gestor', 'operacao', 'auditoria', 'atendimento'] },
  { key: 'users:view', moduleKey: 'users', label: 'Ver usuários', allowedRoles: ['admin', 'gestor'] },
  { key: 'users:create', moduleKey: 'users', label: 'Criar usuário', allowedRoles: ['admin'] },
  { key: 'users:edit', moduleKey: 'users', label: 'Editar usuário', allowedRoles: ['admin'] },
  { key: 'access-control:view', moduleKey: 'access-control', label: 'Ver permissões', allowedRoles: ['admin'] },
  { key: 'access-control:manage', moduleKey: 'access-control', label: 'Gerenciar permissões', allowedRoles: ['admin'] },
];

export function hasModuleAccess(role: UserRole, allowedRoles: UserRole[]) {
  return allowedRoles.includes(role);
}

export function hasActionAccess(role: UserRole, actionKey: string) {
  const action = permissionDefinitions.find((item) => item.key === actionKey);
  if (!action) return false;
  return action.allowedRoles.includes(role);
}
