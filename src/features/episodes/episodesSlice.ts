import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { SortKey, SortState } from './sortSlice';
import Fuse from "fuse.js";

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
    let {results}:any = await(await fetch(FILMS_API)).json();
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

export function sortEpisodesBy(episodes:MovieEpisode[], {key, ascending}: SortState){
  return episodes.sort((a:MovieEpisode, b:MovieEpisode) => {
      switch(key){
        case SortKey.YEAR:
          let aDate = new Date(a[SortKey.YEAR]).getTime();
          let bDate = new Date(b[SortKey.YEAR]).getTime(); 
          return  ascending?aDate - bDate: bDate - aDate;
      }
      return ascending? a[SortKey.EPISODE] -  b[SortKey.EPISODE] : b[SortKey.EPISODE] -  a[SortKey.EPISODE];
  });
}

export function searchInEpisodes(episodes:MovieEpisode[], searchQuery:string){
  const fuse = new Fuse(episodes, FUSE_OPTIONS);
  return searchQuery
  ? (fuse.search(searchQuery).map((row: Fuse.FuseResult<MovieEpisode>) => row.item) as [])
  : episodes;
}