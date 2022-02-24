import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import drawerOpenReducer from '../components/PageLayout/drawerOpenSlice';
import { cognitoApi } from '../services/cognitoApi';

export const store = configureStore({
  reducer: {
    drawerOpen: drawerOpenReducer,
    [cognitoApi.reducerPath]: cognitoApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cognitoApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
