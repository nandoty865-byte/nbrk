import { Navigate, Route, Routes } from 'react-router-dom';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import RequirePermission from '@/components/auth/RequirePermission';
import AppLayout from '@/components/layout/AppLayout';
import PublicLayout from '@/components/layout/PublicLayout';
import AccessManagementPage from '@/pages/app/AccessManagementPage';
import DashboardPage from '@/pages/app/DashboardPage';
import SettingsPage from '@/pages/app/SettingsPage';
import UsersPage from '@/pages/app/UsersPage';
import ComingSoonPage from '@/pages/public/ComingSoonPage';
import ContactPage from '@/pages/public/ContactPage';
import HomePage from '@/pages/public/HomePage';
import LoginPage from '@/pages/public/LoginPage';
import NotFoundPage from '@/pages/public/NotFoundPage';
import PlansPage from '@/pages/public/PlansPage';
import PlanLockedPage from '@/pages/public/PlanLockedPage';
import UnauthorizedPage from '@/pages/public/UnauthorizedPage';

export default function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/planos" element={<PlansPage />} />
        <Route path="/contato" element={<ContactPage />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        <Route path="/plan-locked" element={<PlanLockedPage />} />
        <Route path="/coming-soon" element={<ComingSoonPage />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="/app" element={<AppLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route
            path="access-control"
            element={
              <RequirePermission moduleKey="access-control" fallback={<Navigate to="/unauthorized" replace />}>
                <AccessManagementPage />
              </RequirePermission>
            }
          />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
