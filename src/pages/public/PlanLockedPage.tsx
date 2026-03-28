import { Link } from 'react-router-dom';

export default function PlanLockedPage() {
  return (
    <section className="card status-page">
      <span className="eyebrow">Plano</span>
      <h1>Este módulo não está habilitado no seu plano</h1>
      <p className="muted">Página pronta para futura régua comercial e upgrades.</p>
      <Link to="/planos" className="button">Ver planos</Link>
    </section>
  );
}
