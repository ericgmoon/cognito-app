import React from 'react';

import {
  Card,
} from '@mui/material';

import {
  StyledActions, StyledButton, StyledContent, StyledHeader,
} from './index.styles';

const AppointmentCard = () => (
  <Card>
    <StyledHeader title="3:30PM - 5:30PM" />
    <StyledContent>
      Physics Tutorial
    </StyledContent>
    <StyledActions>
      <StyledButton variant="outlined">
        Book
      </StyledButton>
    </StyledActions>
  </Card>
);

export default AppointmentCard;
