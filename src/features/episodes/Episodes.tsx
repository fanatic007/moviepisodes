import { useEffect, useState } from 'react';
import { sortEpisodesBy } from './episodesSlice';
import { SortKey } from './sortSlice';

export function Episodes({episodes, sort, onSort}:any) {
  const [sortedEpisodes, setSortedEpisodes] = useState([...episodes]);
  useEffect(()=>{
    setSortedEpisodes(sortEpisodesBy([...episodes], sort));
  },[sort, episodes]);

  return (
    <div>
      <ul>
        {
          sortedEpisodes.map((movieEpisode: MovieEpisode) => 
            <li key={movieEpisode.title}>
              {movieEpisode.title}
            </li>          
          )
        }
      </ul>
      <div>
        <button onClick={() => onSort({key:SortKey.EPISODE, ascending:true})}>
          Sort By Episode
        </button>
        <button onClick={() => onSort({key:SortKey.YEAR, ascending:true})}>
          Sort By Year
        </button>
      </div>
    </div>
  );

}
