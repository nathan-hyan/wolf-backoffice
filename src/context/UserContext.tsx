import React, { createContext, useEffect, useState } from 'react';
import { notify } from 'react-notify-toast';
import { useHistory } from 'react-router-dom';
import { checkUserPersistance, loginUser, logoutUser } from 'services/users';

interface ContextProps {
  isLoggedIn: boolean;
  isLoading: boolean;
  // eslint-disable-next-line no-unused-vars
  login: (userData: { email: string; password: string }) => void;
  logout: () => void;
  userName: string;
}

export const UserContext = createContext<ContextProps>({
  isLoggedIn: false,
  isLoading: false,
  userName: '',
  login: () => {},
  logout: () => {},
});

export default function User({ children }: { children: React.ReactNode }) {
  const [userName, setUserName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const history = useHistory();

  const login = (userData: { email: string; password: string }) => {
    setIsLoading(true);
    loginUser(userData)
      .then((response) => {
        setIsLoading(false);
        const { data, ok } = response;
        if (ok) {
          setUserName(data?.username || 'Usuario');
          setIsLoggedIn(true);
          history.push('/products');
        } else {
          throw new Error(String(response.data));
        }
      })
      .catch(() => {
        setIsLoading(false);
        notify.show(
          'No se pudo iniciar sesión, contacte con el Administrador',
          'error',
        );
      });
  };

  const logout = () => {
    setIsLoading(true);
    logoutUser()
      .then(() => {
        setIsLoggedIn(false);
        setIsLoading(false);
        setUserName('');
        history.push('/');
      })
      .catch(() => {
        setIsLoading(false);
        notify.show(
          'No se pudo iniciar sesión, contacte con el Administrador',
          'error',
        );
      });
  };

  useEffect(() => {
    checkUserPersistance()
      .then(({ data, ok }) => {
        if (ok && data) {
          setIsLoggedIn(true);
          setUserName(data.data.username);
          history.push('/products');
        } else {
          history.push('/');
        }
      })
      .catch(() => {
        notify.show(
          'No se pudo verificar la sesión, contacte con el Administrador',
          'error',
        );
      });
  }, [history]);

  return (
    <UserContext.Provider value={{
      userName, isLoggedIn, login, logout, isLoading,
    }}
    >
      {children}
    </UserContext.Provider>
  );
}
