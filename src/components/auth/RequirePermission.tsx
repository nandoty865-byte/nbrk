import type { ReactNode } from 'react';
import type { AppModuleKey } from '@/config/appModules';
import { usePermission } from '@/hooks/usePermission';

type RequirePermissionProps = {
  children: ReactNode;
  moduleKey?: AppModuleKey;
  actionKey?: string;
  fallback?: ReactNode;
};

export default function RequirePermission({ children, moduleKey, actionKey, fallback = null }: RequirePermissionProps) {
  const allowed = usePermission({ moduleKey, actionKey });
  return <>{allowed ? children : fallback}</>;
}
