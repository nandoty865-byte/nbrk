import type { AuthUser } from '@/lib/auth';
import { apiFetch } from '@/lib/http';
import { clearTokens, getRefreshToken, setTokens } from '@/lib/storage';

export type SessionResponse = {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  user: AuthUser;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export const authService = {
  async login(payload: LoginPayload) {
    const data = await apiFetch<SessionResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    setTokens(data.accessToken, data.refreshToken);
    return data;
  },

  async refresh() {
    const refreshToken = getRefreshToken();
    const data = await apiFetch<SessionResponse>('/auth/refresh', {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
    });
    setTokens(data.accessToken, data.refreshToken);
    return data;
  },

  async logout() {
    const refreshToken = getRefreshToken();
    const data = await apiFetch<{ success: boolean; message: string }>('/auth/logout', {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
    });
    clearTokens();
    return data;
  },

  async me() {
    return apiFetch<AuthUser>('/auth/me', {
      method: 'GET',
      auth: true,
    });
  },
};
