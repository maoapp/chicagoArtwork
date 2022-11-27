import {configureStore} from '@reduxjs/toolkit';

// @reducers
import artworkReducer from './reducers/artworkReducer';
import artworkDetailReducer from './reducers/artworkDetailReducer';

export const store = configureStore({
  reducer: {
    artworks: artworkReducer,
    artworkDetail: artworkDetailReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type appDispatch = typeof store.dispatch;
