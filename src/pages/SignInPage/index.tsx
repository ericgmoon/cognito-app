import React from 'react';

import {
  Divider, Grid,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useNavigate } from 'react-router-dom';

import Button from '../../components/Button';
import SignIn from '../../components/SignIn';
import logo from '../../images/logo.png';

import {
  Bold, Container, Logo, RootContainer, Title,
} from './index.styles';

const SignInPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const isMd = useMediaQuery(theme.breakpoints.up('md'));

  const getOrientation = () : ('vertical' | 'horizontal' | undefined) => {
    if (isMd) {
      return 'vertical';
    }
    return 'horizontal';
  };

  const goToSignUp = () => {
    navigate('/signup');
  };

  return (
    <RootContainer>
      <Grid
        container
        rowSpacing={{
          xs: 4, sm: 4, md: 2,
        }}
        columnSpacing={2}
      >
        <Grid item xs={12}>
          <Container>
            <Logo src={logo} alt="logo" />
          </Container>
        </Grid>
        <Grid item xs={12} sm={12} md={5}>
          <Container>
            <Title variant="h6">
              New to the Cognito App?
            </Title>
            <Button onClick={goToSignUp}>
              Sign Up
            </Button>
          </Container>
        </Grid>
        <Grid item xs={12} sm={12} md={2}>
          <Divider orientation={getOrientation()} variant={isMd ? 'fullWidth' : 'middle'}> <Bold>OR</Bold> </Divider>
        </Grid>
        <Grid item xs={12} sm={12} md={5}>
          <SignIn />
        </Grid>
      </Grid>
    </RootContainer>
  );
};

export default SignInPage;
