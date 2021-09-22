import { UserContext } from 'context/UserContext';
import { useContext } from 'react';
import {
  Navbar, Nav, NavDropdown, Container,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from 'assets/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDoorClosed, faDoorOpen } from '@fortawesome/free-solid-svg-icons';

function NavigationBar() {
  const { isLoggedIn, userName } = useContext(UserContext);

  return (
    <Navbar className="px-3 mb-3 " variant="dark" bg="dark">
      <Container>
        <Link
          className="text-decoration-none"
          to={isLoggedIn ? '/products' : '/'}
        >
          <Navbar.Brand>
            <img src={logo} height={40} className="mr-2" alt="Wolf" />
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-between">
          <Nav>
            {isLoggedIn && (
              <Link className="text-decoration-none" to="/products">
                <Navbar.Text>Productos</Navbar.Text>
              </Link>
            )}
            <Link className="px-3 text-decoration-none" to="/buymanagement">
              <Navbar.Text>Manejo de Compra</Navbar.Text>
            </Link>
          </Nav>
          <Nav>
            {isLoggedIn ? (
              <NavDropdown title={userName} id="dropdown">
                <NavDropdown.Item href="/logout">
                  <FontAwesomeIcon icon={faDoorClosed} />
                  {' '}
                  Cerrar Sesión
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Link className="text-decoration-none" to="/login">
                <Navbar.Text>
                  <FontAwesomeIcon icon={faDoorOpen} />
                  {' '}
                  Iniciar sesión
                </Navbar.Text>
              </Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
