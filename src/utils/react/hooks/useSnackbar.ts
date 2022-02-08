/**
 * React hook to handle snackbars
 */

import { useEffect, useState } from 'react';

import { AlertColor } from '@mui/material/Alert';

export default () => {
  const [open, setOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [type, setType] = useState<AlertColor>('info');

  useEffect(() => {
    setOpen(true);
  }, [message]);

  const triggerSnackbar = (newMessage: string, newType: AlertColor) => {
    setMessage(newMessage);
    setType(newType);
  };

  const closeSnackbar = (_event?: any, reason?: string) => {
    if (reason === 'clickaway') return;
    setOpen(false);
  };

  return {
    open, message, type, triggerSnackbar, closeSnackbar,
  };
};
