import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import App from './app/app';
import './global.scss';
import './assets/scss/app.scss';
import { queryClient } from './app/config/react-query';
import { QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { toastOptions } from './app/config/toast';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <Toaster toastOptions={toastOptions} position="bottom-right" />
    </QueryClientProvider>
  </StrictMode>
);
