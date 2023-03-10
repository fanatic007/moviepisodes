import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';


const SELECTED_EPISODE = 'selectedEpisode';

export interface SelectedEpisode {
  selectedEpisode:MovieEpisode | null,
}

const initialState: SelectedEpisode = {
  selectedEpisode: null,
};

export const selectedEpisodeSlice = createSlice({
  name: SELECTED_EPISODE,
  initialState,
  reducers: {
    selectEpisode: (state, action: PayloadAction<MovieEpisode|null>) => {
      state.selectedEpisode = action.payload;
    },
  },
});

export const { selectEpisode } = selectedEpisodeSlice.actions;

export const getSelectedEpisode = (state: RootState) => state.selectedEpisode;

export default selectedEpisodeSlice.reducer;
