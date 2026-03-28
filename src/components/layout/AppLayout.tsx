import { Outlet } from 'react-router-dom';
import Sidebar from '@/components/layout/Sidebar';
import { useAuth } from '@/contexts/AuthContext';

export default function AppLayout() {
  const { user, logout } = useAuth();

  return (
    <div className="app-shell">
      <Sidebar />
      <div className="app-content">
        <header className="app-header">
          <div>
            <p className="eyebrow">Ambiente autenticado</p>
            <strong>{user?.name}</strong>
            <p className="muted">{user?.email} · perfil {user?.role}</p>
          </div>
          <button type="button" className="button button--ghost" onClick={logout}>
            Sair
          </button>
        </header>
        <main className="page-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
