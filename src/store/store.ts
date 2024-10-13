import counterReducer from '@/store/features/counterSlice';
import blftmaApi from '@/store/services/blftma';
import pokemonApi from '@/store/services/pokemon';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
    [blftmaApi.reducerPath]: blftmaApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware).concat(blftmaApi.middleware)
});

setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself.
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
