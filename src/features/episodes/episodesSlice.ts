import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { FetchEpisodesState, FILMS_API, LOAD_EPISODES } from '../../constants';

const EPISODES = 'episodes';

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