import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AppShell } from './components/AppShell';
import { CustomerProfilePage } from './pages/CustomerProfilePage';
import { DashboardPage } from './pages/DashboardPage';
import { DigitalTwinPage } from './pages/DigitalTwinPage';
import { StoreAlertsPage } from './pages/StoreAlertsPage';
import { StoreAnalysisPage } from './pages/StoreAnalysisPage';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/digital-twin" element={<DigitalTwinPage />} />
      <Route path="/store-analysis" element={<StoreAnalysisPage />} />
      <Route path="/customer-profile" element={<CustomerProfilePage />} />
      <Route path="/store-alerts" element={<StoreAlertsPage />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <AppShell>
        <AppRoutes />
      </AppShell>
    </BrowserRouter>
  );
}
