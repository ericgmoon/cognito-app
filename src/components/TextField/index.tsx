import React, { forwardRef } from 'react';

import { InputBaseProps } from '@mui/material/InputBase';

import { StyledTextField } from './index.styles';

const TextField = forwardRef((props: InputBaseProps, ref) => (
  <StyledTextField inputRef={ref} {...props} />
));

export default TextField;
