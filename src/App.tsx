import React from 'react';

import './App.css';
import './fonts/fonts.css';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import { ThemeProvider } from 'styled-components';

import Button from './components/Button';
import theme from './theme';

const App = () => (
  <ThemeProvider theme={theme}>
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      <Button text="epic stuff" />
    </MUIThemeProvider>
  </ThemeProvider>
);

export default App;
