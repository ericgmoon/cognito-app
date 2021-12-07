import React from 'react';

import {
  Divider, Grid,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import logo from '../../../images/logo.png';
import Button from '../../Button';
import Login from '../../Login';

import {
  Bold, Container, Logo, RootContainer, Title,
} from './index.styles';

const LoginPage = () => {
  const theme = useTheme();

  const isMd = useMediaQuery(theme.breakpoints.up('md'));

  const getOrientation = () : ('vertical' | 'horizontal' | undefined) => {
    if (isMd) {
      return 'vertical';
    }
    return 'horizontal';
  };

  return (
    <RootContainer>
      <Grid
        container
        rowSpacing={{
          xs: 4, md: 2,
        }}
        columnSpacing={2}
      >
        <Grid item xs={12}>
          <Container>
            <Logo src={logo} alt="logo" />
          </Container>
        </Grid>
        <Grid item xs={12} md={5}>
          <Container>
            <Title variant="h6">
              New to the Cognito App?
            </Title>
            <Button>
              Sign Up
            </Button>
          </Container>
        </Grid>
        <Grid item xs={12} md={2}>
          <Divider orientation={getOrientation()}> <Bold>OR</Bold> </Divider>
        </Grid>
        <Grid item xs={12} md={5}>
          <Login />
        </Grid>
      </Grid>
    </RootContainer>
  );
};

export default LoginPage;
