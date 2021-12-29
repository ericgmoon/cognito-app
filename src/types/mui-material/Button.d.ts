import '@mui/material/Button';

declare module '@mui/material/Button' {
  export interface ButtonPropsColorOverrides {
    darkPrimary: true;
    gray: true;
    darkGray: true;
    chemistry: true;
    physics: true;
  }
}
