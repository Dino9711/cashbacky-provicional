import { ThemeProvider, createTheme } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
const theme = createTheme({
  palette: {
    primary: {
      main: '#222224',
    },
    secondary: {
      main: '#48588c',
    },
    success: {
      main: '#7789ae',
    },
    error: {
      main: '#f5f5f5',
    },
    warning: {
      main: '#c1badd',
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
);
