import { render } from 'react-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'styles/main.scss';
import App from './App';

const rootElement = document.getElementById('root');
render(<App />, rootElement);
