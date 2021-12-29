import '@mui/material/Button';

declare module '@mui/material/Button' {
  export interface ButtonPropsColorOverrides {
    darkPrimary: true;
    darkGray: true,
    chemistry: true,
    physics: true,
  }
}
