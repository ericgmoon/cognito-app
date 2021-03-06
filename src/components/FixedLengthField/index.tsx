import React, {
  forwardRef, useEffect, useRef, useState,
} from 'react';

import Grow from '@mui/material/Grow';
import { InputBaseProps } from '@mui/material/InputBase';

import {
  Container, ErrorText, FieldContainer, ProxyInputField, StyledTextField,
} from './index.styles';

const UnitField = forwardRef(({ error, size = 'medium', ...rest }: InputBaseProps, ref) => (
  <StyledTextField
    error={error}
    inputRef={ref}
    inputProps={{ maxLength: 1 }}
    size={size}
    {...rest}
  />
));

interface FixedLengthFieldProps {
  /**
   * The field is styled as an error if `true`
   */
  error?: boolean,
  /**
   * Message to be displayed if `error` is `true`
   */
  errorMessage?: string,
  /**
   * The first editable field is highlighted if `true`
   */
  autoFocus?: boolean,
  /**
   * Uneditable text to be appended to the start of the output text
   */
  prefix?: string,
  /**
   * Number of editable slots
   */
  maxLength?: number,
  /**
   * Uneditable text to be appended to the start of the displayed text
   */
  displayedPrefix?: string,
  /**
   * Only allows numbers if `true`
   */
  numbersOnly?: boolean,
  /**
   * Multiplier for the size of the field
   */
  size?: 'small' | 'medium',
}

const FixedLengthField = forwardRef((
  { error,
    errorMessage,
    autoFocus = false,
    prefix = '',
    maxLength = 4,
    displayedPrefix = '',
    numbersOnly = false,
    size,
    ...rest }
  : FixedLengthFieldProps, ref: React.Ref<HTMLInputElement>) => {
  const [value, setValue] = useState(prefix);
  const [isTouched, setIsTouched] = useState(false);
  const inputRef = useRef<any>([]);

  // Ref to ProxyInputField used to artificially focus on
  // This is necessary due to the way react-hook-form takes in
  // the field value
  const proxyRef = useRef<any | null>(null);

  const prefixLength = prefix.length;
  const totalLength = prefixLength + maxLength;

  const focusOnNextField = () => {
    setIsTouched(true);
    if (value.length < totalLength && inputRef.current[value.length]) {
      inputRef.current[value.length].focus();
    } else if (inputRef.current[value.length - 1]) {
      inputRef.current[value.length - 1].focus();
    }
  };

  const insertCharIntoValue = (atIndex: number, string: String) => {
    setValue(value.slice(0, atIndex) + string + value.slice(atIndex + 1));
    proxyRef.current.focus();
  };

  const removeEditableChar = () => {
    if (value.length > prefixLength) {
      setValue(value.slice(0, -1));
      proxyRef.current.focus();
    }
  };

  const isNum = (x: string) => !Number.isNaN(parseInt(x, 10));

  useEffect(() => {
    if (isTouched || autoFocus) focusOnNextField();
  }, [value]);

  return (
    <Container>
      <ProxyInputField
        ref={(node) => {
          // Attach proxyRef to ProxyInputField
          proxyRef.current = node;
          if (typeof ref === 'function') ref(node);
        }}
        value={value}
        maxLength={maxLength}
        tabIndex={-1}
        {...rest}
      />
      <FieldContainer size={size}>
        {[...displayedPrefix].map((x, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <UnitField key={`${x}_${i}`} value={x} disabled size={size} />
        ))}
        {[...Array(maxLength).keys()].map((x) => (
          <UnitField
            error={error}
            key={x}
            value={value.charAt(prefixLength + x) || ''}
            ref={(el) => { inputRef.current[prefixLength + x] = el; }}
            onFocus={() => focusOnNextField()}
            onChange={(e) => (!numbersOnly || isNum(e.target.value))
              && insertCharIntoValue(prefixLength + x, e.target.value)}
            onKeyDown={(e) => e.key === 'Backspace' && removeEditableChar()}
            size={size}
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

export default FixedLengthField;
