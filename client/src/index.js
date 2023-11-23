import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App';


const root = document.getElementById('root');
const rootElement = createRoot(root);

rootElement.render(
    <BrowserRouter>
        
            <App />
        
    </BrowserRouter>
);
