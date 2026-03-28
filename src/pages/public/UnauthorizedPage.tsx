import { Link } from 'react-router-dom';

export default function UnauthorizedPage() {
  return (
    <section className="card status-page">
      <span className="eyebrow">Sem acesso</span>
      <h1>Você não tem permissão para este módulo</h1>
      <p className="muted">Use um perfil com acesso ou volte ao dashboard.</p>
      <div className="hero-actions">
        <Link to="/app" className="button">Ir para dashboard</Link>
        <Link to="/login" className="button button--ghost">Trocar usuário</Link>
      </div>
    </section>
  );
}
