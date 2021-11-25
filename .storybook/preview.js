import theme from '../src/theme';

import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from 'styled-components';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

export const decorators = [
  (Story) => (
    <MUIThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Story />
      </ThemeProvider>
    </MUIThemeProvider>
  )
]