import { delay, http, HttpResponse } from 'msw';
import { refreshStore, users } from './data';

function createToken(prefix: string, userId: string) {
  return `${prefix}.${userId}.${Math.random().toString(36).slice(2)}.${Date.now()}`;
}

function extractAccessToken(request: Request) {
  const auth = request.headers.get('Authorization');
  if (!auth?.startsWith('Bearer ')) return null;
  return auth.replace('Bearer ', '');
}

function resolveUserByAccessToken(token: string | null) {
  if (!token) return null;
  const [, userId] = token.split('.');
  return Object.values(users).find((entry) => entry.profile.id === userId)?.profile ?? null;
}

export const handlers = [
  http.post('/auth/login', async ({ request }) => {
    await delay(350);
    const body = (await request.json()) as { email?: string; password?: string };
    const email = body.email?.trim().toLowerCase() ?? '';
    const password = body.password ?? '';

    const user = users[email];
    if (!user || user.password !== password) {
      return HttpResponse.json({ message: 'Credenciais inválidas' }, { status: 401 });
    }

    const accessToken = createToken('access', user.profile.id);
    const refreshToken = createToken('refresh', user.profile.id);
    refreshStore.set(refreshToken, user.profile.id);

    return HttpResponse.json({
      accessToken,
      refreshToken,
      expiresIn: 900,
      user: user.profile,
    });
  }),

  http.post('/auth/refresh', async ({ request }) => {
    await delay(250);
    const body = (await request.json().catch(() => ({}))) as { refreshToken?: string };
    const currentRefreshToken = body.refreshToken ?? '';
    const userId = refreshStore.get(currentRefreshToken);

    if (!userId) {
      return HttpResponse.json({ message: 'Refresh token inválido ou expirado' }, { status: 401 });
    }

    const user = Object.values(users).find((entry) => entry.profile.id === userId);
    if (!user) {
      return HttpResponse.json({ message: 'Usuário não encontrado' }, { status: 404 });
    }

    refreshStore.delete(currentRefreshToken);
    const nextAccessToken = createToken('access', user.profile.id);
    const nextRefreshToken = createToken('refresh', user.profile.id);
    refreshStore.set(nextRefreshToken, user.profile.id);

    return HttpResponse.json({
      accessToken: nextAccessToken,
      refreshToken: nextRefreshToken,
      expiresIn: 900,
      user: user.profile,
    });
  }),

  http.post('/auth/logout', async ({ request }) => {
    await delay(150);
    const body = (await request.json().catch(() => ({}))) as { refreshToken?: string };
    if (body.refreshToken) refreshStore.delete(body.refreshToken);
    return HttpResponse.json({ success: true, message: 'Logout realizado com sucesso' });
  }),

  http.get('/auth/me', async ({ request }) => {
    await delay(150);
    const accessToken = extractAccessToken(request);
    const user = resolveUserByAccessToken(accessToken);

    if (!user) {
      return HttpResponse.json({ message: 'Não autenticado' }, { status: 401 });
    }

    return HttpResponse.json(user);
  }),
];
