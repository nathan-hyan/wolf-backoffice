import { faDoorOpen } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';
import ButtonWithIcon from 'components/ButtonWithIcon';
import ContentContainer from 'components/ContentContainer';
import { useContext, useEffect } from 'react';
import { UserContext } from 'context/UserContext';

function Logout() {
  const history = useHistory();
  const { logout } = useContext(UserContext);

  const handleRedirect = () => {
    history.push('/');
  };
  useEffect(() => {
    logout();
  }, [logout]);

  return (
    <ContentContainer centerContent>
      <h1>Has cerrado sesión</h1>
      <ButtonWithIcon
        className="mt-5"
        label="Volver a la pagina principal"
        icon={faDoorOpen}
        onClick={handleRedirect}
      />
    </ContentContainer>
  );
}

export default Logout;
