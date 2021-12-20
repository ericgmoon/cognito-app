import '@mui/material/styles';
// Add more properties here as required in theme.tsx

declare module '@mui/system' {
  export interface Shape {
    drawerWidth: number,
  }

  export interface ShapeOptions {
    drawerWidth?: number,
  }
}

declare module '@mui/material/styles' {
  export interface Palette {
    darkPrimary: Palette['primary'],
    gray: Palette['primary'],
    darkGray: Palette['primary'],
  }

  export interface PaletteOptions{
    darkPrimary?: PaletteOptions['primary'],
    darkGray: PaletteOptions['primary'],
    gray: PaletteOptions['primary'],
  }
}
