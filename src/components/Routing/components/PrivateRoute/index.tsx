/* eslint-disable react/jsx-props-no-spreading */
import { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { UserContext } from 'context/UserContext';

const PrivateRoute = ({ render: Render, ...rest }: any) => {
  const { isLoggedIn } = useContext(UserContext);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (isLoggedIn) {
          return <Render {...props} />;
        }
        return <Redirect to="/" />;
      }}
    />
  );
};

export default PrivateRoute;
