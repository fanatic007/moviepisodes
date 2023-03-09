import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { SortByState, SortKey } from '../../constants';

const SORT = 'sort';

export const columnsConfig:SortState[] = [
  {header:'EPISODE', key:SortKey.EPISODE, ascending:null},
  {header:'TITLE', key:SortKey.TITLE, ascending:null},
  {header:'YEAR', key:SortKey.YEAR, ascending:null}
];

const tempCC = {...columnsConfig[2]};
tempCC.ascending = true;
export const sortInitialState: SortByState = {
  sort:tempCC
};

export const sortSlice = createSlice({
  name: SORT,
  initialState: sortInitialState,
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