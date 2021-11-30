import '@mui/material/styles';

// Add more properties here as required in theme.ts
declare module '@mui/material/styles' {
  export interface Palette {
      darkPrimary: {
        main: string,
        dark: string,
        light: string,
        contrastText: string,
    }
  }

  export interface PaletteOptions{
    darkPrimary?: {
      main?: string,
      dark?: string,
      light?: string,
      contrastText?: string,
    }
  }

  export interface Theme {
    palette: Palette
  }

  export interface ThemeOptions {
    palette?: PaletteOptions
  }
}
