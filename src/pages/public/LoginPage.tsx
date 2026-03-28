import type { FormEvent } from 'react';
import { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const presets = [
  { label: 'Admin', email: 'admin@vistapro.local' },
  { label: 'Gestor', email: 'gestor@vistapro.local' },
  { label: 'Operação', email: 'operacao@vistapro.local' },
  { label: 'Auditoria', email: 'auditoria@vistapro.local' },
  { label: 'Atendimento', email: 'atendimento@vistapro.local' },
];

export default function LoginPage() {
  const { isAuthenticated, login, isBootstrapping } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('admin@vistapro.local');
  const [password, setPassword] = useState('123456');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isBootstrapping && isAuthenticated) return <Navigate to="/app" replace />;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      const nextPath = (location.state as { from?: { pathname?: string } } | null)?.from?.pathname || '/app';
      navigate(nextPath, { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha ao autenticar.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="login-wrap card stack-md">
      <div>
        <span className="eyebrow">Acesso</span>
        <h1>Entrar no VistaPro</h1>
        <p className="muted">Mock REST local ativo com MSW. Use a senha padrão <strong>123456</strong>.</p>
      </div>

      <div className="login-presets">
        {presets.map((preset) => (
          <button
            key={preset.email}
            type="button"
            className="button button--ghost"
            onClick={() => {
              setEmail(preset.email);
              setPassword('123456');
            }}
          >
            {preset.label}
          </button>
        ))}
      </div>

      <form className="form" onSubmit={handleSubmit}>
        <label>
          <span>E-mail</span>
          <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
        </label>
        <label>
          <span>Senha</span>
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
        </label>
        {error ? <div className="alert">{error}</div> : null}
        <button className="button" type="submit" disabled={loading || isBootstrapping}>
          {loading || isBootstrapping ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
    </section>
  );
}
