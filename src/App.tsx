import Routing from 'components/Routing';
import NavigationBar from 'components/NavigationBar';
import { Container } from 'react-bootstrap';
import ProductsProvider from 'context/ProductsContext';
import { HashRouter } from 'react-router-dom';
import Notifications from 'react-notify-toast';
import User from './context/UserContext';

function App() {
  return (
    <div className="app">
      <Notifications />
      <HashRouter basename={process.env.PUBLIC_URL}>
        <User>
          <ProductsProvider>
            <NavigationBar />
            <Container>
              <Routing />
            </Container>
          </ProductsProvider>
        </User>
      </HashRouter>
    </div>
  );
}

export default App;
