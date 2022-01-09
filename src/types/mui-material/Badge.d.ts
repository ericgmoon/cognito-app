import '@mui/material/Badge';

declare module '@mui/material/Badge' {
  export interface BadgePropsColorOverrides {
    online: true;
  }
}
