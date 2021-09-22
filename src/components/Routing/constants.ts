import Home from 'screens/Home';
import Login from 'screens/Auth/screens/Login';
import Products from 'screens/Products';
import Logout from 'screens/Auth/screens/Logout';
import buyManagement from 'screens/BuyManagement';

export const ROUTES = [
  {
    id: 0,
    route: '/',
    component: Home,
  },
  {
    id: 1,
    route: '/login',
    component: Login,
  },
  {
    id: 2,
    route: '/products',
    component: Products,
    isPrivate: true,
  },
  {
    id: 3,
    route: '/buymanagement',
    component: buyManagement,
    isPrivate: true,
  },
  {
    id: 4,
    route: '/logout',
    component: Logout,
  },

];
