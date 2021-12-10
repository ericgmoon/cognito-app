import React from 'react';

import './App.css';
import './fonts/fonts.css';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import { ThemeProvider } from 'styled-components';

import {
  confirmEmailConfirmationCode,
  confirmSignUp,
  getCurrentUser,
  getCurrentUsername,
  getUserAttributes,
  sendEmailConfirmationCode,
  signIn,
  signOut,
  signUpWithValidation,
} from './auth';
import Button from './components/Button';
import theme from './theme';

const App = () => (
  <ThemeProvider theme={theme}>
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      <Button
        onClick={async () => signUpWithValidation('ericgmoon2', 'password123', 'lunar.6022@gmail.com', '+61426869117')}
      >Sign Up
      </Button>
      <br />
      <Button
        onClick={() => confirmSignUp('ericgmoon2', '902884')}
      >Confirm
      </Button>
      <br />
      <Button
        onClick={() => signIn('ericgmoon', 'password123')}
      >Sign In
      </Button>
      <br />
      <Button
        onClick={async () => {
          console.log(getCurrentUser());
          getUserAttributes(getCurrentUsername(), (err, attributes) => console.log(attributes));
        }}
      >Get User
      </Button>
      <br />
      <Button
        onClick={() => signOut()}
      >Sign Out
      </Button>
      <br />
      <Button
        onClick={() => {
          const username = getCurrentUsername();
          if (username) sendEmailConfirmationCode(username);
        }}
      >Send Email Code
      </Button>
      <br />
      <Button
        onClick={() => {
          const username = getCurrentUsername();
          if (username) confirmEmailConfirmationCode(username, '781104');
        }}
      >Verify Email
      </Button>
    </MUIThemeProvider>
  </ThemeProvider>
);

export default App;
