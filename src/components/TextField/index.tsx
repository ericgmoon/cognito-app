import React from 'react';

import { TextFieldProps as MUITextFieldProps } from '@mui/material';

import { StyledTextField } from './index.styles';

const TextField = ({ disabled = false, label }: MUITextFieldProps) => (
  <StyledTextField label={label} disabled={disabled} variant="outlined" />
);

export default TextField;
