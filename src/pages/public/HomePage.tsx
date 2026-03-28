import { Link } from 'react-router-dom';
import { appModules } from '@/config/appModules';

export default function HomePage() {
  return (
    <div className="stack-lg">
      <section className="hero card">
        <span className="eyebrow">Pacote 2 · Base VistaPro</span>
        <h1>Site público + shell logado + autenticação + base de permissões</h1>
        <p>
          Esta versão já aproxima o starter da arquitetura final do VistaPro,
          incluindo módulos, páginas públicas, estados especiais e primeiros controles de acesso.
        </p>
        <div className="hero-actions">
          <Link to="/login" className="button">Entrar agora</Link>
          <Link to="/planos" className="button button--ghost">Ver planos</Link>
        </div>
      </section>

      <section className="card">
        <div className="section-header">
          <div>
            <span className="eyebrow">Módulos</span>
            <h2>Mapa inicial da plataforma</h2>
          </div>
        </div>
        <div className="grid">
          {appModules.map((module) => (
            <article key={module.key} className="mini-card">
              <h3>{module.label}</h3>
              <p>{module.description}</p>
              <span className="status-pill">{module.availability}</span>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
