import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <section className="card status-page">
      <span className="eyebrow">404</span>
      <h1>Página não encontrada</h1>
      <p className="muted">A rota informada não existe nesta base inicial.</p>
      <Link to="/" className="button">Voltar para o início</Link>
    </section>
  );
}
