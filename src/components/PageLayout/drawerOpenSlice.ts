import { createSlice } from '@reduxjs/toolkit';

interface DrawerOpenState {
  value: boolean,
}

const initialState: DrawerOpenState = {
  value: true,
};

export const drawerOpenSlice = createSlice({
  name: 'drawerOpen',
  initialState,
  reducers: {
    open: (state) => { state.value = true; },
    close: (state) => { state.value = false; },
    toggle: (state) => { state.value = !state.value; },
  },
});

export const { open, close, toggle } = drawerOpenSlice.actions;

export default drawerOpenSlice.reducer;
