import React, { useState } from 'react';

import { Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import SignUp from '../../components/SignUp';
import VerificationCode from '../../components/VerificationCode';
import logo from '../../images/logo.png';

import {
  Container, Logo, RootContainer, Title,
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
    <SignUp goToVerify={goToVerify} />,
    <VerificationCode finishSignUp={finishSignUp} email={email} />,
  ];

  return (
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
          {steps[step]}
        </Grid>
      </Grid>
    </RootContainer>
  );
};

export default SignUpPage;
