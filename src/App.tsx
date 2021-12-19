import React from 'react';

import './fonts/fonts.css';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import {
  BrowserRouter, Route, Routes,
} from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import {
  HomePage, SignInPage, SignUpPage,
} from './pages';
import theme from './theme';

const App = () => (
  <ThemeProvider theme={theme}>
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </MUIThemeProvider>
  </ThemeProvider>
);

export default App;
