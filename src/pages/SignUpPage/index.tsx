import React from 'react';

import { Grid } from '@mui/material';

import SignUp from '../../components/SignUp';
import logo from '../../images/logo.png';

import {
  Container, Logo, RootContainer, Title,
} from './index.styles';

const SignUpPage = () => (
  <RootContainer>
    <Grid
      container
      rowSpacing={{
        xs: 2, sm: 2, md: 4,
      }}
      columnSpacing={2}
    >
      <Grid item xs={12} sm={12} md={4}>
        <Container>
          <Logo src={logo} alt="logo" />
        </Container>
      </Grid>
      <Grid item xs={12} sm={12} md={8}>
        <Container>
          <Title variant="h4">
            Sign Up to Cognito
          </Title>
        </Container>
      </Grid>
      <Grid item xs={12}>
        <SignUp />
      </Grid>
    </Grid>
  </RootContainer>
);

export default SignUpPage;
