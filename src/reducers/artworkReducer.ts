import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import axios from 'axios';
import {Dispatch} from 'redux';

// @constants
import {END_POINTS, HOST} from '../constants/constants';

// @types
import {Artworks, IArtwork, IRequest} from '../types';

export const getArtworks = () => async (dispatch: Dispatch<any>) => {
  dispatch(getArtworksRequest());
  try {
    const response = await axios.get(`${HOST}/${END_POINTS.artworks}`);
    dispatch(getArtworksRequestSuccessful(response.data));
  } catch (err) {
    dispatch(getArtworksRequestFailure());
  }
};

export const onSelectArtwork =
  (artwork: IArtwork) => (dispatch: Dispatch<any>) =>
    dispatch(selectArtwork(artwork));

export const getArtworkImage = () => async (dispatch: Dispatch<any>) => {
  dispatch(getArtworksRequest());
  try {
    const response = await axios.get(`${HOST}/${END_POINTS.artworks}`);
    dispatch(getArtworksRequestSuccessful(response.data.data));
  } catch (err) {
    dispatch(getArtworksRequestFailure());
  }
};

export interface IArtworksState {
  artworks: IRequest<Artworks>;
  artworkSelected: IArtwork;
}
const initialState: IArtworksState = {
  artworks: {
    loading: false,
    data: null as unknown as Artworks,
    error: false,
    successful: false,
  },
  artworkSelected: null as unknown as IArtwork,
};

export const artworksSlice = createSlice({
  name: 'artworks',
  initialState,
  reducers: {
    getArtworksRequest: state => {
      state.artworks.loading = true;
    },
    getArtworksRequestFailure: state => {
      state.artworks.error = true;
    },
    getArtworksRequestSuccessful: (state, action: PayloadAction<Artworks>) => {
      state.artworks.data = action.payload;
    },
    selectArtwork: (state, action: PayloadAction<IArtwork>) => {
      state.artworkSelected = action.payload;
    },
  },
});

export const {
  getArtworksRequest,
  getArtworksRequestFailure,
  getArtworksRequestSuccessful,
  selectArtwork,
} = artworksSlice.actions;
export const showArtworks = state => state.artworks.artworks;
export const showArtworkDetail = state => state.artworks.artworkSelected;

export default artworksSlice.reducer;
