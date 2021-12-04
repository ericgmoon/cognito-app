import '@mui/material/styles';

// Add more properties here as required in theme.ts
declare module '@mui/material/styles' {
  export interface Palette {
    darkPrimary: Palette['primary'],
  }

  export interface PaletteOptions{
    darkPrimary?: PaletteOptions['primary'],
  }
}
