//https://blog.logrocket.com/handling-date-strings-typescript/
type oneToNine = 1|2|3|4|5|6|7|8|9
type zeroToNine = 0|1|2|3|4|5|6|7|8|9
type YYYY = `19${zeroToNine}${zeroToNine}` | `20${zeroToNine}${zeroToNine}`
type MM = `0${oneToNine}` | `1${0|1|2}`
type DD = `${0}${oneToNine}` | `${1|2}${zeroToNine}` | `3${0|1}`
type RawDateString = `${YYYY}-${MM}-${DD}`;


type MovieEpisode = {
  title: string,
  episode_id: number,
  opening_crawl: string,
  director: string,
  release_date: Date,
  // release_date: RawDateString | Date,
}

type MovieEpisodeListItem = Pick<MovieEpisode, 'title'|'opening_crawl' | 'director'>
type MovieEpisodeDetail = Pick<MovieEpisode, 'title' | 'opening_crawl' | 'release_date' | 'episode_id'>;