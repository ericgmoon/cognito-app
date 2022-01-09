import { configureStore } from '@reduxjs/toolkit';

import drawerOpenReducer from '../components/PageLayout/drawerOpenSlice';

export const store = configureStore({
  reducer: {
    drawerOpen: drawerOpenReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
