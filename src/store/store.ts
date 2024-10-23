import applicationReducer from '@/store/features/application-slice';
import blftmaApi from '@/store/services/blftma';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore({
  reducer: {
    application: applicationReducer,
    [blftmaApi.reducerPath]: blftmaApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(blftmaApi.middleware)
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
