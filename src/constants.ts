export const LOAD_EPISODES = `episodes/loadEpisodes`;
export enum FetchEpisodesState {
  IDLE='idle',
  LOADING='loading',
  FAILED='failed'
}

export const NO_MOVIE_SELECTED = `No Movie Selected`;

export enum SortKey {
  YEAR = 'release_date',
  EPISODE = 'episode_id',
  TITLE = 'title'
}
export const EPISODES: MovieEpisode[] = [{
  episode_id: 5,
  title: "The Empire Strikes Back",
  release_date: "1980-05-17",
  director: "Irvin Kershner",
  opening_crawl: "It is a dark time for the Rebellion. Although the… remote probes into the far reaches of space...."
},
{
  episode_id: 4,
  title: "A new Hope",
  release_date: "1977-05-25",
  director: "George Lucas",
  opening_crawl: "It is a period of civil war.Rebel spaceships, strikingfrom a hidden base, have wontheir first victory againstthe evil Galactic Empire.During the battle, Rebelspies managed to steal secretplans to the Empire'sultimate weapon, the DEATHSTAR, an armored spacestation with enough powerto destroy an entire planet.P"
}];

export const titles = { [SortKey.YEAR]: 'Year', [SortKey.EPISODE]: 'Episode', [SortKey.TITLE]: 'Title'  };

export interface SortByState {
  sort:SortState,
}

export const SEARCH_DEBOUNCE_TIME = 350;


export const EPISODES_SEARCH_KEYS = ['episode_id', 'title', 'release_date'];

export const FUSE_OPTIONS = {
  threshold: 0.3,
  keys: EPISODES_SEARCH_KEYS
}

export const FILMS_API = 'https://swapi.dev/api/films/?format=json';
