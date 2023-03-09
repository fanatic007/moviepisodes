import { EPISODES, FetchEpisodesState } from '../../constants';
import episodesReducer, { EpisodesState, loadEpisodesAsync, setEpisodes } from './episodesSlice';

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