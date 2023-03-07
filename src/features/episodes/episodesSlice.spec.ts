import episodesReducer, { EpisodesState, FetchEpisodesState, loadEpisodesAsync, setEpisodes } from './episodesSlice';

export const EPISODES: MovieEpisode[] = [{
  episode_id: 5,
  title: "The Empire Strikes Back",
  release_date: new Date("1980-05-17"),
  director: "Irvin Kershner",
  opening_crawl: "It is a dark time for the Rebellion. Although the… remote probes into the far reaches of space...."
},
{
  episode_id: 4,
  title: "A new Hope",
  release_date: new Date("1977-05-25"),
  director: "George Lucas",
  opening_crawl: "It is a period of civil war.Rebel spaceships, strikingfrom a hidden base, have wontheir first victory againstthe evil Galactic Empire.During the battle, Rebelspies managed to steal secretplans to the Empire'sultimate weapon, the DEATHSTAR, an armored spacestation with enough powerto destroy an entire planet.P"
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