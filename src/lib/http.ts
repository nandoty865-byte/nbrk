import { clearTokens, getAccessToken, getRefreshToken, setTokens } from '@/lib/storage';

type ApiRequestInit = RequestInit & {
  auth?: boolean;
};

export async function apiFetch<T>(path: string, options: ApiRequestInit = {}): Promise<T> {
  const headers = new Headers(options.headers ?? {});

  if (!headers.has('Content-Type') && options.body) {
    headers.set('Content-Type', 'application/json');
  }

  if (options.auth) {
    const accessToken = getAccessToken();
    if (accessToken) headers.set('Authorization', `Bearer ${accessToken}`);
  }

  const response = await fetch(path, {
    ...options,
    headers,
  });

  if (response.status === 401 && path !== '/auth/refresh' && getRefreshToken()) {
    const refreshed = await tryRefresh();
    if (refreshed) {
      return apiFetch<T>(path, options);
    }
  }

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload?.message ?? `Erro HTTP ${response.status}`);
  }

  return payload as T;
}

async function tryRefresh() {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return false;

  const response = await fetch('/auth/refresh', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refreshToken }),
  });

  if (!response.ok) {
    clearTokens();
    return false;
  }

  const payload = await response.json();
  setTokens(payload.accessToken, payload.refreshToken);
  return true;
}
