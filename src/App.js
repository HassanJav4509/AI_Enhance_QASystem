import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import MainPage from './pages/MainPage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <MainPage />
    </ThemeProvider>
  );
}

export default App;
