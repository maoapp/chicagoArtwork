import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import axios from 'axios';
import {Dispatch} from 'redux';

// @constants
import {END_POINTS, HOST} from '../constants/constants';
import {AppDispatch, RootState} from '../store';

// @types
import {Artworks, IArtwork, IRequest} from '../types';

export const getArtworks =
  (page: number) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(getArtworksRequest());
    try {
      const response = await axios.get(
        `${HOST}/${END_POINTS.artworks}?page=${page}`,
      );
      let artworks = response.data;

      if (page > 1 && page < response.data.pagination.limit) {
        const currentData = getState().artworks.artworks.data;
        artworks = {
          ...artworks,
          data: [...currentData.data, ...response.data.data],
        };
      }

      dispatch(getArtworksRequestSuccessful(artworks));
    } catch (err) {
      dispatch(getArtworksRequestFailure());
    }
  };
export const onSelectArtwork =
  (artwork: IArtwork) => (dispatch: Dispatch<any>) =>
    dispatch(selectArtwork(artwork));

export interface IArtworksState {
  artworks: IRequest<Artworks>;
  artworkSelected: IArtwork;
}
const initialState: IArtworksState = {
  artworks: {
    loading: true,
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

export default artworksSlice.reducer;
