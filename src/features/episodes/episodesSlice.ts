import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export const EPISODES = 'episodes';
export const LOAD_EPISODES = `${EPISODES}/loadEpisodes`;
export enum FetchEpisodesState {
  IDLE='idle',
  LOADING='loading',
  FAILED='failed'
}

export const EPISODES_SEARCH_KEYS = ['episode_id', 'title', 'release_date'];

export const FUSE_OPTIONS = {
  threshold: 0.3,
  keys: EPISODES_SEARCH_KEYS
}

export const FILMS_API = 'https://swapi.dev/api/films/?format=json';

export interface EpisodesState {
  episodes:MovieEpisode[],
  status: FetchEpisodesState,
}

const initialState: EpisodesState = {
  episodes:[],
  status: FetchEpisodesState.IDLE
};

export const loadEpisodesAsync = createAsyncThunk(
  LOAD_EPISODES,
  async () => {
    let {results}:FilmsApiResponse = await(await fetch(FILMS_API)).json();
    return results.map(({episode_id, title, release_date, director, opening_crawl }:MovieEpisode) => 
      ({episode_id, title, release_date, director, opening_crawl })
    ) as MovieEpisode[];
  }
);
 
export const episodesSlice = createSlice({
  name: EPISODES,
  initialState,
  reducers: {
    setEpisodes: (state, action: PayloadAction<MovieEpisode[]>) => {
      state.episodes = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadEpisodesAsync.pending, (state) => {
        state.status = FetchEpisodesState.LOADING;
      })
      .addCase(loadEpisodesAsync.fulfilled, (state, action) => {
        state.status = FetchEpisodesState.IDLE;
        state.episodes = action.payload;
      })
  },
});

export const { setEpisodes } = episodesSlice.actions ;

export const getEpisodes = (state: RootState) => state.episodes;

export default episodesSlice.reducer;