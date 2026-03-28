import type { UserRole } from '@/lib/auth';

export type AppModuleKey =
  | 'dashboard'
  | 'users'
  | 'reports'
  | 'integrations'
  | 'access-control';

export type AppModule = {
  key: AppModuleKey;
  label: string;
  description: string;
  path: string;
  showInSidebar: boolean;
  availability: 'available' | 'coming-soon' | 'plan-locked';
  allowedRoles: UserRole[];
};

export const appModules: AppModule[] = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    description: 'Visão geral da operação e dos principais indicadores.',
    path: '/app',
    showInSidebar: true,
    availability: 'available',
    allowedRoles: ['admin', 'gestor', 'operacao', 'auditoria', 'atendimento'],
  },
  {
    key: 'users',
    label: 'Usuários',
    description: 'Gestão de usuários internos, status e perfis.',
    path: '/app/users',
    showInSidebar: true,
    availability: 'available',
    allowedRoles: ['admin', 'gestor'],
  },
  {
    key: 'reports',
    label: 'Relatórios',
    description: 'Consolidação analítica da operação.',
    path: '/app/reports',
    showInSidebar: true,
    availability: 'coming-soon',
    allowedRoles: ['admin', 'gestor', 'auditoria'],
  },
  {
    key: 'integrations',
    label: 'Integrações',
    description: 'Conexões com CRMs, ERPs e portais parceiros.',
    path: '/app/integrations',
    showInSidebar: true,
    availability: 'plan-locked',
    allowedRoles: ['admin'],
  },
  {
    key: 'access-control',
    label: 'Permissões',
    description: 'Governança inicial de módulos e ações.',
    path: '/app/access-control',
    showInSidebar: true,
    availability: 'available',
    allowedRoles: ['admin'],
  },
];

export function getAppModule(key: AppModuleKey) {
  return appModules.find((module) => module.key === key);
}

export function getSidebarModules() {
  return appModules.filter((module) => module.showInSidebar);
}
