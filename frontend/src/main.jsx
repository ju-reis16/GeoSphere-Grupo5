import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

// Renderiza o componente App dentro do StrictMode para ajudar a identificar problemas potenciais
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);