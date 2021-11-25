import React, { Fragment } from 'react';

import { Button as MaterialButton } from '@mui/material';

import { HelloContainer } from './index.styles';

const Button = () => (
  <>
    <HelloContainer>
      Hello World!
    </HelloContainer>
    <MaterialButton variant="outlined">Hello</MaterialButton>
  </>
);

export default Button;
