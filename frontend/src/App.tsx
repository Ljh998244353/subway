import { Component, lazy, Suspense, type ErrorInfo, type ReactNode } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AppShell } from './components/AppShell';

const CustomerProfilePage = lazy(() => import('./pages/CustomerProfilePage').then((module) => ({ default: module.CustomerProfilePage })));
const DashboardPage = lazy(() => import('./pages/DashboardPage').then((module) => ({ default: module.DashboardPage })));
const DigitalTwinPage = lazy(() => import('./pages/DigitalTwinPage').then((module) => ({ default: module.DigitalTwinPage })));
const PremiumStylePreviewPage = lazy(() => import('./pages/PremiumStylePreviewPage').then((module) => ({ default: module.PremiumStylePreviewPage })));
const StoreAlertsPage = lazy(() => import('./pages/StoreAlertsPage').then((module) => ({ default: module.StoreAlertsPage })));
const StoreAnalysisPage = lazy(() => import('./pages/StoreAnalysisPage').then((module) => ({ default: module.StoreAnalysisPage })));

type AppErrorBoundaryState = {
  hasError: boolean;
};

class AppErrorBoundary extends Component<{ children: ReactNode }, AppErrorBoundaryState> {
  state: AppErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): AppErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Route render failed', error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="state-panel" role="alert">
          当前页面加载失败，请返回导航重试。
        </div>
      );
    }

    return this.props.children;
  }
}

function RouteLoadingFallback() {
  return (
    <div className="state-panel state-panel--loading" role="status">
      正在加载演示模块...
    </div>
  );
}

export function AppRoutes() {
  return (
    <AppErrorBoundary>
      <Suspense fallback={<RouteLoadingFallback />}>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/digital-twin" element={<DigitalTwinPage />} />
          <Route path="/style-preview" element={<PremiumStylePreviewPage />} />
          <Route path="/store-analysis" element={<StoreAnalysisPage />} />
          <Route path="/customer-profile" element={<CustomerProfilePage />} />
          <Route path="/store-alerts" element={<StoreAlertsPage />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Suspense>
    </AppErrorBoundary>
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
