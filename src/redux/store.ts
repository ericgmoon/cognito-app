import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import drawerOpenReducer from '../components/PageLayout/drawerOpenSlice';
import { tutorialsApi } from '../services/tutorials';
import { userApi } from '../services/users';

export const store = configureStore({
  reducer: {
    drawerOpen: drawerOpenReducer,
    [userApi.reducerPath]: userApi.reducer,
    [tutorialsApi.reducerPath]: tutorialsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
