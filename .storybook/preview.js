import theme from '../src/theme';

import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from 'styled-components';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import '../src/fonts/fonts.css';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

// TODO: Check and remove Storybook compatibility code once Storybook is in v7: 
// https://mui.com/guides/migration-v4/#storybook-emotion-with-v5
const withThemeProvider = (Story, context) => {
  return (
    <ThemeProvider theme={theme}>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        <MemoryRouter>
          <Routes>
            <Route path="/" element={<Story {...context} />} />
          </Routes>
        </MemoryRouter>
      </MUIThemeProvider>
    </ThemeProvider>
  );
}

export const decorators = [withThemeProvider]