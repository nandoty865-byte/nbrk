import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { AuthUser, clearUser, getStoredUser, saveUser } from '@/lib/auth';
import { clearTokens } from '@/lib/storage';
import { authService } from '@/services/authService';

type AuthContextValue = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isBootstrapping: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(getStoredUser());
  const [isBootstrapping, setIsBootstrapping] = useState(true);

  useEffect(() => {
    let active = true;

    async function bootstrap() {
      try {
        const profile = await authService.me();
        if (!active) return;
        saveUser(profile);
        setUser(profile);
      } catch {
        clearTokens();
        clearUser();
        if (active) setUser(null);
      } finally {
        if (active) setIsBootstrapping(false);
      }
    }

    bootstrap();
    return () => {
      active = false;
    };
  }, []);

  const value = useMemo<AuthContextValue>(() => ({
    user,
    isAuthenticated: Boolean(user),
    isBootstrapping,
    async login(email, password) {
      const session = await authService.login({ email, password });
      saveUser(session.user);
      setUser(session.user);
    },
    async logout() {
      try {
        await authService.logout();
      } finally {
        clearTokens();
        clearUser();
        setUser(null);
      }
    },
  }), [user, isBootstrapping]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth deve ser usado dentro de AuthProvider');
  return context;
}
