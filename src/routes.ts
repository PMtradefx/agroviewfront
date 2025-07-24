/**
 * This file lists all the frontend routes defined in the React app (plaga/src/App.tsx).
 * It includes the path, component, and access control (public or private).
 */

interface RouteInfo {
  path: string;
  component: string;
  private: boolean;
}

const routes: RouteInfo[] = [
  {
    path: '/login',
    component: 'Login',
    private: false,
  },
  {
    path: '/dashboardold',
    component: 'Dashboardold',
    private: true,
  },
 {
    path: '/dashboard/*',
    component: 'Dashboard',
    private: true,
  },
  {
    path: '/',
    component: 'Index',
    private: false,
  },
];

export default routes;
