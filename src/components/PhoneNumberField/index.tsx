import React, {
  forwardRef, useEffect, useRef, useState,
} from 'react';

import Grow from '@mui/material/Grow';
import { InputBaseProps } from '@mui/material/InputBase';

import {
  Container, ErrorText, FieldContainer, ProxyInputField, StyledTextField,
} from './index.styles';

// interface UnitFieldProps extends InputBaseProps {

// }

const FIXED_LENGTH = 4;
const EDITABLE_LENGTH = 8;
const TOTAL_LENGTH = FIXED_LENGTH + EDITABLE_LENGTH;

const UnitField = forwardRef(({ error, ...rest }: InputBaseProps, ref) => (
  <StyledTextField
    error={error}
    inputRef={ref}
    inputProps={{ maxLength: 1 }}
    {...rest}
  />
));

interface PhoneNumberFieldProps {
  error?: boolean,
  errorMessage?: string,
  autoFocus?: boolean,
}

const PhoneNumberField = forwardRef((
  { error,
    errorMessage,
    autoFocus = false }
  : PhoneNumberFieldProps, ref: React.Ref<HTMLInputElement>) => {
  const [value, setValue] = useState('+614');
  const [isTouched, setIsTouched] = useState(false);
  const inputRef = useRef<any>([]);

  const focusOnNextField = () => {
    setIsTouched(true);
    if (value.length < TOTAL_LENGTH) inputRef.current[value.length].focus();
    else inputRef.current[value.length - 1].focus();
  };

  const insertCharIntoValue = (atIndex: number, string: String) => {
    setValue(value.slice(0, atIndex) + string + value.slice(atIndex + 1));
  };

  const removeEditableChar = () => {
    if (value.length > FIXED_LENGTH) setValue(value.slice(0, -1));
  };

  const isNum = (x: string) => !Number.isNaN(parseInt(x, 10));

  useEffect(() => {
    if (isTouched || autoFocus) focusOnNextField();
  }, [value]);

  return (
    <Container>
      <ProxyInputField
        ref={ref}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        maxLength={EDITABLE_LENGTH}
      />
      <FieldContainer>
        <UnitField value="0" disabled />
        <UnitField value="4" disabled />
        {[...Array(EDITABLE_LENGTH).keys()].map((x) => (
          <UnitField
            error={error}
            key={x}
            value={value.charAt(x + FIXED_LENGTH) || ''}
            ref={(el) => { inputRef.current[x + FIXED_LENGTH] = el; }}
            onFocus={() => focusOnNextField()}
            onChange={(e) => isNum(e.target.value)
              && insertCharIntoValue(x + FIXED_LENGTH, e.target.value)}
            onKeyDown={(e) => e.key === 'Backspace' && removeEditableChar()}
          />
        ),
        )}
      </FieldContainer>
      <Grow in={error} {...(error ? { timeout: 600 } : {})}>
        <ErrorText variant="caption">
          {errorMessage}
        </ErrorText>
      </Grow>
    </Container>
  );
});

export default PhoneNumberField;
