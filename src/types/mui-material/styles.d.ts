import '@mui/material/styles';
// Add more properties here as required in theme.tsx

declare module '@mui/system' {
  export interface Shape {
    drawerWidth: number,
    appbarHeight: number,
  }

  export interface ShapeOptions {
    drawerWidth?: number,
    appbarHeight?: number,
  }
}

declare module '@mui/material/styles' {
  export interface Palette {
    darkPrimary: Palette['primary'],
    highlight: Palette['primary'],
    gray: Palette['primary'],
    darkGray: Palette['primary'],
    chemistry: Palette['primary'],
    physics: Palette['primary'],
  }

  export interface PaletteOptions{
    darkPrimary?: PaletteOptions['primary'],
    highlight?: PaletteOptions['primary'],
    darkGray: PaletteOptions['primary'],
    gray: PaletteOptions['primary'],
    chemistry: Palette['primary'],
    physics: Palette['primary'],
  }
}
