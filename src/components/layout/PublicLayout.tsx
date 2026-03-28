import { Link, NavLink, Outlet } from 'react-router-dom';
import BrandLogo from '@/components/common/BrandLogo';

export default function PublicLayout() {
  return (
    <div className="public-shell">
      <header className="topbar">
        <Link to="/" className="brand-link"><BrandLogo /></Link>
        <nav className="nav">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/planos">Planos</NavLink>
          <NavLink to="/contato">Contato</NavLink>
          <Link to="/login" className="button button--ghost">Entrar</Link>
        </nav>
      </header>
      <main className="public-main">
        <Outlet />
      </main>
      <footer className="footer">
        <div>
          <strong>VistaPro</strong>
          <p>Base pública inicial com identidade visual, CTAs e páginas institucionais.</p>
        </div>
        <div>
          <Link to="/contato">Falar com o time</Link>
        </div>
      </footer>
    </div>
  );
}
