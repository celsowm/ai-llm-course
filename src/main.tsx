import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import App from './app/App';
import { appTheme } from './app/theme';
import { I18nProvider } from './i18n/I18nProvider';
import 'katex/dist/katex.min.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <I18nProvider>
        <HashRouter>
          <App />
        </HashRouter>
      </I18nProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
