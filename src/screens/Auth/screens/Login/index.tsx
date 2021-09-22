import { faDoorOpen } from '@fortawesome/free-solid-svg-icons';
import { Col, Form, Row } from 'react-bootstrap';
import ButtonWithIcon from 'components/ButtonWithIcon';
import ContentContainer from 'components/ContentContainer';
import CustomInput from 'components/CustomInput';
import { FormEvent, useContext, useState } from 'react';
import { UserContext } from 'context/UserContext';

function Login() {
  const [state, setState] = useState({
    email: '',
    password: '',
  });

  const { login, isLoading } = useContext(UserContext);

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(state);
  };

  return (
    <Row className="align-items-center">
      <Col />
      <Col md={5} sm={12}>
        <ContentContainer>
          <Form onSubmit={handleSubmit}>
            <CustomInput
              name="email"
              label="Nombre de Usuario"
              type="email"
              onChange={handleChange}
              value={state.email}
            />

            <CustomInput
              className="pt-3"
              name="password"
              label="Contraseña"
              type="password"
              pattern=".{4,}"
              title="La contraseña debe tener por lo menos 4 caracteres "
              onChange={handleChange}
              value={state.password}
            />

            <ButtonWithIcon
              disabled={isLoading}
              className="mt-4"
              variant="success"
              type="submit"
              label="Iniciar Sesión"
              icon={faDoorOpen}
            />
          </Form>
        </ContentContainer>
      </Col>
      <Col />
    </Row>
  );
}

export default Login;
