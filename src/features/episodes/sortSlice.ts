import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export const SORT = 'sort';

export enum SortKey {
  YEAR = 'release_date',
  EPISODE = 'episode_id'
}

export interface SortState {
  key:SortKey,
  ascending: boolean
}

export interface SortByState {
  sort:SortState,
}

export const initialState: SortByState = {
  sort:{
    key:SortKey.YEAR,
    ascending:false
  }
};

export const sortSlice = createSlice({
  name: SORT,
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    sortEpisodes: (state, action: PayloadAction<SortState>) => {
      state.sort = action.payload;
    },
  }
});

export const { sortEpisodes } = sortSlice.actions;

export const getSortKey = (state: RootState) => state.sort;

export default sortSlice.reducer;
