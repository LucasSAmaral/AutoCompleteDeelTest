import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';
import App from './App.tsx'
import { AutoCompleteProvider } from './provider/AutoComplete.provider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AutoCompleteProvider>
      <App />
    </AutoCompleteProvider>
  </StrictMode>,
);
