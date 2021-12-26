import theme from '../src/theme';

import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Provider as ReduxProvider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import '../src/fonts/fonts.css';
import { store } from '../src/redux/store';

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
    <ReduxProvider store={store}>
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
    </ReduxProvider>
  );
}

export const decorators = [withThemeProvider]