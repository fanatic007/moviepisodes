import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';


const SELECTED_EPISODE = 'selectedEpisode';

export interface SelectedEpisode {
  selectedEpisode:MovieEpisode | null,
}

const initialState: SelectedEpisode = {
  selectedEpisode: null,
};

export const episodesSlice = createSlice({
  name: SELECTED_EPISODE,
  initialState,
  reducers: {
    selectEpisode: (state, action: PayloadAction<MovieEpisode>) => {
      state.selectedEpisode = action.payload;
    },
  },
});

export const { selectEpisode } = episodesSlice.actions;

export const getSelectedEpisode = (state: RootState) => state.selectedEpisode;

export default episodesSlice.reducer;
