import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { EPISODES, FetchEpisodesState } from '../constants';
import episodesReducer from '../features/episodes/episodesSlice';
import searchReducer, { searchInitialState } from '../features/search/searchSlice';
import selectedEpisodeReducer from '../features/selectedEpisode/selectedEpisodeSlice';
import sortReducer, { sortInitialState } from '../features/sort/sortSlice';


export const reducer = {
  episodes: episodesReducer,
  sort: sortReducer,
  search: searchReducer,
  selectedEpisode: selectedEpisodeReducer
};

export const store = configureStore({
  reducer,
});

export const DEFAULT_STATE = {
  episodes:{episodes:EPISODES, status:FetchEpisodesState.IDLE},
  sort:sortInitialState,
  search:searchInitialState,
  selectedEpisode:{selectedEpisode:null}
}


export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
