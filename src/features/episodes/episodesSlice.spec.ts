import episodesReducer, { EpisodesState, FetchEpisodesState, loadEpisodesAsync, setEpisodes } from './episodesSlice';

export const EPISODES: MovieEpisode[] = [{
  episode_id: 5,
  title: "The Empire Strikes Back",
  release_date: new Date("1980-05-17"),
  director: "Irvin Kershner",
  opening_crawl: "It is a dark time for the Rebellion. Although the… remote probes into the far reaches of space...."
}];

describe('episodes reducer', () => {
  const initialState: EpisodesState = {
    episodes: [],
    status: FetchEpisodesState.IDLE
  };
  
  describe('extra episode reducer', ()=>{
    it('sets status loading before fetching data', () => {
      const action = { type: loadEpisodesAsync.pending.type };
      const {status} = episodesReducer(initialState, action);
      expect(status).toEqual('loading');
    });

    it('sets status idle after fetching data', () => {
      const action = { type: loadEpisodesAsync.fulfilled.type, payload: EPISODES };
      const state = episodesReducer(initialState, action);
      expect(state).toEqual({status:'idle', episodes:EPISODES});
    });
  });

  it('should handle initial state', () => {
    expect(episodesReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should set episodes', () => {
    const {episodes} = episodesReducer(initialState, setEpisodes(EPISODES));
    expect(episodes).toEqual(EPISODES);
  });
});
``