import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import episodesReducer from '../features/episodes/episodesSlice';
import sortReducer from '../features/episodes/sortSlice';
import searchReducer from '../features/search/searchSlice';
import selectedEpisodeReducer from '../features/selectedEpisode/selectedEpisodeSlice';

export const store = configureStore({
  reducer: {
    episodes: episodesReducer,
    sort: sortReducer,
    search: searchReducer,
    selectedEpisode: selectedEpisodeReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
