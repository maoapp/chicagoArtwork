import {configureStore} from '@reduxjs/toolkit';
import {useDispatch} from 'react-redux';

// @reducers
import artworkReducer from './reducers/artworkReducer';

export const store = configureStore({
  reducer: {
    artworks: artworkReducer,
  },
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
export type appDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
