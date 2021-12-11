import React from 'react';

import { Grid } from '@mui/material';

import Button from '../../components/Button';
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
      <Grid item xs={12} sm={12} md={4.5}>
        <Container>
          <Logo src={logo} alt="logo" />
        </Container>
      </Grid>
      <Grid item xs={12} sm={12} md={7.5}>
        <Container>
          <Title variant="h4">
            Sign Up to Cognito
          </Title>
        </Container>
      </Grid>
      <Grid item xs={12}>
        <Container>
          <Button> Hello! </Button>
        </Container>
      </Grid>
    </Grid>
  </RootContainer>
);

export default SignUpPage;
