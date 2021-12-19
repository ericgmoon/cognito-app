import React, { useState } from 'react';

import {
  Grid, Link,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { AuthPageLayout } from '../../components/PageLayout';
import SignUp from '../../components/SignUp';
import VerificationCode from '../../components/VerificationCode';
import logo from '../../images/logo.png';

import {
  Container, FooterText, HeaderContainer, Logo, RootContainer, Title,
} from './index.styles';

const SignUpPage = () => {
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const goToVerify = (emailInput: string) => {
    setStep(step + 1);
    setEmail(emailInput);
  };

  const finishSignUp = () => {
    navigate('/');
  };

  const steps = [
    <Container>
      <SignUp goToVerify={goToVerify} />
      <FooterText>Already have an account? <Link href="/signin" underline="always">Sign In</Link></FooterText>
    </Container>,
    <VerificationCode finishSignUp={finishSignUp} email={email} />,
  ];

  return (
    <AuthPageLayout title="Sign Up - Cognito App">
      <RootContainer>
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
            {steps[step]}
          </Grid>
        </Grid>
      </RootContainer>
    </AuthPageLayout>
  );
};

export default SignUpPage;
