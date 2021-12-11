import React, { forwardRef } from 'react';

import Grow from '@mui/material/Grow';
import { InputBaseProps } from '@mui/material/InputBase';

import {
  Container, ErrorText, StyledTextField,
} from './index.styles';

interface TextFieldProps extends InputBaseProps {
  errorMessage?: string
}

const TextField = forwardRef(({ error, errorMessage, className, ...rest }: TextFieldProps, ref) => (
  <Container className={className}>
    <StyledTextField fullWidth error={error} inputRef={ref} {...rest} />
    <Grow in={error} {...(error ? { timeout: 600 } : {})}>
      <ErrorText variant="caption">
        {errorMessage}
      </ErrorText>
    </Grow>
  </Container>
));

export default TextField;
