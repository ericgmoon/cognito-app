/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react';

import {
  Divider, Grid, Link, Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useNavigate } from 'react-router-dom';

import Button from '../../components/Button';
import { AuthPageLayout } from '../../components/PageLayout';
import SignIn from '../../components/SignIn';
import logo from '../../images/logo.png';

import {
  Bold, Container, FooterText, Logo, RootContainer, Title,
} from './index.styles';

const SignInPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const isMd = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <AuthPageLayout title="Sign In">
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
          <Grid item xs={12} sm={12} md={5}>
            <Container>
              <Title variant="h6">
                New to the Cognito App?
              </Title>
              <Button href="/signup">
                Sign Up
              </Button>
            </Container>
          </Grid>
          <Grid item xs={12} sm={12} md={2}>
            <Divider orientation={isMd ? 'vertical' : 'horizontal'} variant={isMd ? 'fullWidth' : 'middle'}> <Bold>OR</Bold> </Divider>
          </Grid>
          <Grid item xs={12} sm={12} md={5}>
            <Container>
              <SignIn
                onAuthenticate={() => navigate('/')}
              />
              <FooterText>{'Forgot password? '}
                <Link
                  component="button"
                  onClick={() => { console.log('hello world'); }}
                >
                  <Typography>Reset Password</Typography>
                </Link>
              </FooterText>
            </Container>
          </Grid>
        </Grid>
      </RootContainer>
    </AuthPageLayout>
  );
};

export default SignInPage;
