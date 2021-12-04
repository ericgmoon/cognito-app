import 'styled-components';
import { Theme } from '@mui/material/styles';

// Extend the MUI Theme object to use the same theme defined in theme.ts for styled-components
declare module 'styled-components' {
  export interface DefaultTheme extends Theme{}
}
