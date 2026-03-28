import { Link, NavLink } from 'react-router-dom';
import BrandLogo from '@/components/common/BrandLogo';
import { getSidebarModules } from '@/config/appModules';

const availabilityLabel = {
  'available': '',
  'coming-soon': 'Em breve',
  'plan-locked': 'Plano',
} as const;

export default function Sidebar() {
  const modules = getSidebarModules();

  return (
    <aside className="sidebar">
      <Link to="/app" className="brand-link brand-link--sidebar">
        <BrandLogo compact />
      </Link>

      <nav className="sidebar-nav">
        {modules.map((module) => {
          const badge = availabilityLabel[module.availability];
          const disabled = module.availability !== 'available';

          if (disabled) {
            return (
              <span key={module.key} className="sidebar-nav__item sidebar-nav__item--disabled" title={module.description}>
                <span>{module.label}</span>
                {badge ? <small>{badge}</small> : null}
              </span>
            );
          }

          return (
            <NavLink key={module.key} to={module.path} end={module.path === '/app'} title={module.description}>
              <span>{module.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
