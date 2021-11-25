import { createTheme } from '@mui/material/styles';

// Augment module to accept custom theme values
// declare module '@mui/material/styles' {
//     interface Theme {
//       status: {
//         danger: string;
//       };
//     }
//     // allow configuration using `createTheme`
//     interface ThemeOptions {
//       status?: {
//         danger?: string;
//       };
//     }
//   }

const theme = {
  spacing: 8,
  shape: {
    borderRadius: 4,
  },
  palette: {
    primary: {
      main: '#70d0d1',
      dark: '#32989a',
      light: '#d1eff0',
      contrastText: '#000',
    },
    secondary: {
      main: '#345995',
      dark: '#20365b',
      light: '#5982c5',
      contrastText: '#fff',
    },
    error: {
      main: '#f44336',
      light: '#e57373',
      dark: '#d32f2f',
      contrastText: '#fff',
    },
    warning: {
      main: '#ff9800',
      light: '#ffb74d',
      dark: '#df57c00',
      contrastText: '#fff',
    },
    info: {
      main: '#2196f3',
      light: '#64b5f6',
      dark: '#1976d2',
      contrastText: '#fff',
    },
    success: {
      main: '#4caf50',
      light: '#81c784',
      dark: '#388e3c',
      contrastText: 'rgba(0,0,0,0.87)',
    },
    divider: 'rgba(0,0,0,0.12)',
  },
  typography: {
    fontSize: 14,
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    htmlFontSize: 16,
    h1: {
      fontSize: '6rem',
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 300,
      lineHeight: 1.167,
      letterSpacing: '-0.01562em',
    },
    h2: {
      fontSize: '3.75rem',
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 300,
      lineHeight: 1.2,
      letterSpacing: '-0.0833em',
    },
    h3: {
      fontSize: '3rem',
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 400,
      lineHeight: 1.167,
      letterSpacing: '0em',
    },
    h4: {
      fontSize: '2.125rem',
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 400,
      lineHeight: 1.235,
      letterSpacing: '0.00735em',
    },
    h5: {
      fontSize: '1.5rem',
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 400,
      lineHeight: 1.334,
      letterSpacing: '0em',
    },
    h6: {
      fontSize: '1.25rem',
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 500,
      lineHeight: 1.6,
      letterSpacing: '0.0075em',
    },
    subtitle1: {
      fontSize: '1rem',
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 400,
      lineHeight: 1.75,
      letterSpacing: '0.00938em',
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 500,
      lineHeight: 1.57,
      letterSpacing: '0.00714em',
    },
    body1: {
      fontSize: '1rem',
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 400,
      lineHeight: 1.5,
      letterSpacing: '0.00938em',
    },
    body2: {
      fontSize: '0.875rem',
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 400,
      lineHeight: 1.43,
      letterSpacing: '0.01071em',
    },
    button: {
      fontSize: '0.875rem',
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 500,
      lineHeight: 1.75,
      letterSpacing: '0.02857em',
    },
    caption: {
      fontSize: '0.75rem',
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 400,
      lineHeight: 1.66,
      letterSpacing: '0.03333em',
    },
    overline: {
      fontSize: '0.75rem',
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 400,
      lineHeight: 2.66,
      letterSpacing: '0.08333em',
    },
  },
};

export default createTheme(theme);
