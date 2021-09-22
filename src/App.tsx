import Routing from 'components/Routing';
import NavigationBar from 'components/NavigationBar';
import { Container } from 'react-bootstrap';
import ProductsProvider from 'context/ProductsContext';
import { BrowserRouter as Router } from 'react-router-dom';
import Notifications from 'react-notify-toast';
import User from './context/UserContext';

function App() {
  return (
    <div className="app">
      <Notifications />
      <Router>
        <User>
          <ProductsProvider>
            <NavigationBar />
            <Container>
              <Routing />
            </Container>
          </ProductsProvider>
        </User>
      </Router>
    </div>
  );
}

export default App;
