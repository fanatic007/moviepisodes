import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export const SORT = 'sort';

export enum SortKey {
  YEAR = 'release_date',
  EPISODE = 'episode_id',
  TITLE = 'title'
}


export const titles = { [SortKey.YEAR]: 'Year', [SortKey.EPISODE]: 'Episode', [SortKey.TITLE]: 'Title'  };


export interface SortState {
  header:string,
  key:SortKey,
  ascending: boolean | null
}

export interface SortByState {
  sort:SortState,
}

export const columnsConfig:SortState[] = [
  {header:'EPISODE', key:SortKey.EPISODE, ascending:null},
  {header:'TITLE', key:SortKey.TITLE, ascending:null},
  {header:'YEAR', key:SortKey.YEAR, ascending:null}
];

const tempCC = {...columnsConfig[2]};
tempCC.ascending = true;
export const initialState: SortByState = {
  sort:tempCC
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