export type UserRole = 'admin' | 'gestor' | 'operacao' | 'auditoria' | 'atendimento';

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  permissions: string[];
};

const USER_STORAGE_KEY = 'vistapro.auth.user';

export function getStoredUser(): AuthUser | null {
  const raw = window.localStorage.getItem(USER_STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AuthUser;
  } catch {
    window.localStorage.removeItem(USER_STORAGE_KEY);
    return null;
  }
}

export function saveUser(user: AuthUser) {
  window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
}

export function clearUser() {
  window.localStorage.removeItem(USER_STORAGE_KEY);
}
