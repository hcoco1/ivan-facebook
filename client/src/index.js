import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App';
import { store } from './app/store'
import { Provider } from 'react-redux'


const root = document.getElementById('root');
const rootElement = createRoot(root);

rootElement.render(
    <Provider store={store}>
        <BrowserRouter>

            <App />

        </BrowserRouter>
    </Provider>

);
