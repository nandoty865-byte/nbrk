import { getAppModule } from '@/config/appModules';
import { hasActionAccess, hasModuleAccess } from '@/config/accessControl';
import { useAuth } from '@/contexts/AuthContext';
import type { AppModuleKey } from '@/config/appModules';

export function usePermission(options: { moduleKey?: AppModuleKey; actionKey?: string }) {
  const { user } = useAuth();
  if (!user) return false;

  if (options.actionKey) {
    return hasActionAccess(user.role, options.actionKey);
  }

  if (options.moduleKey) {
    const module = getAppModule(options.moduleKey);
    if (!module) return false;
    return hasModuleAccess(user.role, module.allowedRoles) && module.availability === 'available';
  }

  return false;
}
