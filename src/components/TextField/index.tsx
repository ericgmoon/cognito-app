import React from 'react';

import { StyledTextField } from './index.styles';

interface TextFieldProps {
    label: string;
    disabled?: boolean;
}

const TextField = ({ disabled = false, label }: TextFieldProps) => (
  <StyledTextField label={label} disabled={disabled} variant="outlined" />
);

export default TextField;
