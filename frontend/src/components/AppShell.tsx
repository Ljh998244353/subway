import type { PropsWithChildren } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { appRoutes, buildRouteWithGlobalQuery, getGlobalQuery } from '../routes/routeConfig';

export function AppShell({ children }: PropsWithChildren) {
  const location = useLocation();
  const globalQuery = getGlobalQuery(location.search);

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">
        跳到主内容
      </a>

      <header className="topbar" aria-label="全局上下文">
        <div className="topbar__brand">
          <span className="topbar__mark" aria-hidden="true">M</span>
          <span className="topbar__brand-copy">
            <span className="topbar__title">商业综合体视觉 AI 数字孪生运营系统</span>
            <span className="topbar__mall">示范商业中心</span>
          </span>
        </div>

        <div className="topbar__filters" aria-label="全局筛选">
          <span className="status-chip status-chip--info">Mock 数据</span>
          <span className="status-chip">时间：{globalQuery.timeRange}</span>
          <span className="status-chip">商场：{globalQuery.mallId}</span>
        </div>

        <div className="topbar__meta">
          <span>最近更新：刚刚</span>
          <span>角色：运营经理</span>
          <button className="ghost-button" type="button" aria-label="刷新 Mock 数据">
            刷新
          </button>
        </div>
      </header>

      <div className="shell-body">
        <nav className="sidebar" aria-label="主导航">
          {appRoutes.map((route) => (
            <NavLink
              className={({ isActive }) => `sidebar__link${isActive ? ' is-active' : ''}`}
              key={route.path}
              to={buildRouteWithGlobalQuery(route.path, location.search)}
            >
              <span>{route.label}</span>
              {route.badge ? <span className="sidebar__badge">{route.badge}</span> : null}
            </NavLink>
          ))}
        </nav>

        <main className="content" id="main-content" tabIndex={-1}>
          {children}
        </main>
      </div>
    </div>
  );
}
