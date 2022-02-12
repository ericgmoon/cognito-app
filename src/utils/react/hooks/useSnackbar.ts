/**
 * React hook to handle snackbars
 */

import { useContext } from 'react';

import { SnackbarContext } from '../../../components/PageLayout';

const useSnackBars = () => useContext(SnackbarContext);

export default useSnackBars;
