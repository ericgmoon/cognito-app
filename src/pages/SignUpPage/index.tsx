import React, { useState } from 'react';

import {
  Grid, Link, Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import SignUp from '../../components/SignUp';
import VerificationCode from '../../components/VerificationCode';
import logo from '../../images/logo.png';
import {
  confirmSignUp, resendConfirmationCode, signIn,
} from '../../services/auth';

import {
  Container, FooterText, HeaderContainer, Logo, RootContainer, Title, VerificationCodeContainer,
} from './index.styles';

const SignUpPage = () => {
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const goToVerify = (emailInput: string, passwordInput: string) => {
    setStep(step + 1);
    setEmail(emailInput);
    setPassword(passwordInput);
  };

  const finishSignUp = async () => {
    await signIn(email, password);
    navigate('/');
  };

  const SignUpStep = (
    <Grid
      container
      rowSpacing={{
        xs: 2, sm: 2, md: 4,
      }}
      columnSpacing={2}
    >
      <Grid item xs={12}>
        <HeaderContainer>
          <Logo src={logo} alt="logo" />
          <Title variant="h4">
            Sign Up to Cognito
          </Title>
        </HeaderContainer>
      </Grid>
      <Grid item xs={12}>
        <Container>
          <SignUp next={goToVerify} />
          <FooterText>Already have an account? <Link href="/signin" underline="always">Sign In</Link></FooterText>
        </Container>
      </Grid>
    </Grid>
  );

  const VerificationStep = (
    <Grid
      container
      rowSpacing={{
        xs: 2, sm: 2, md: 4,
      }}
      columnSpacing={2}
    >
      <Grid item xs={12}>
        <HeaderContainer>
          <Title variant="h4">
            Verify Your Account
          </Title>
        </HeaderContainer>
      </Grid>
      <Grid item xs={12}>
        <Container>
          <Typography variant="h6">Please enter the verification code</Typography>
          <Typography variant="h6">sent to your mobile device.</Typography>
          <VerificationCodeContainer>
            <VerificationCode
              confirm={async ({ verification }) => confirmSignUp(email, verification)}
              resend={async () => resendConfirmationCode(email)}
              onConfirm={finishSignUp}
            />
          </VerificationCodeContainer>
        </Container>
      </Grid>
    </Grid>
  );

  const steps = [
    SignUpStep,
    VerificationStep,
  ];

  return (
    <RootContainer>
      {steps[step]}
    </RootContainer>
  );
};

export default SignUpPage;
