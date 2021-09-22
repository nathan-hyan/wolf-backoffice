import { Switch, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import { ROUTES } from './constants';

function Routing() {
  return (
    <Switch>
      {ROUTES.map((route) => (route.isPrivate ? (
        <PrivateRoute
          key={route.id}
          exact
          path={route.route}
          render={route.component}
        />
      ) : (
        <Route
          key={route.id}
          exact
          path={route.route}
          component={route.component}
        />
      )))}
    </Switch>
  );
}

export default Routing;
