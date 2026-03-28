import { Link } from 'react-router-dom';

export default function ComingSoonPage() {
  return (
    <section className="card status-page">
      <span className="eyebrow">Em breve</span>
      <h1>Módulo em construção</h1>
      <p className="muted">Página padrão para módulos roadmap.</p>
      <Link to="/app" className="button">Voltar</Link>
    </section>
  );
}
