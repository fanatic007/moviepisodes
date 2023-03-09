import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

const SEARCH = 'search';

export interface SearchState {
    searchQuery:string,
}

export const searchInitialState: SearchState = {
    searchQuery:'',
};

export const episodesSlice = createSlice({
  name: SEARCH,
  initialState : searchInitialState,
  reducers: {
    searchEpisode: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  }
});

export const { searchEpisode } = episodesSlice.actions;

export const getSearchQuery = (state: RootState) => state.search;

export default episodesSlice.reducer;
