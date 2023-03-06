import { useEffect, useState } from 'react';
import { searchInEpisodes, sortEpisodesBy } from './episodesSlice';
import { SortKey } from './sortSlice';

export function Episodes({episodes, sort, selectedEpisode, onSort, searchQuery, onEpisodeSelected}:any) {
  const [episodesView, setEpisodesView] = useState(episodes);
  useEffect(()=>{
    setEpisodesView(sortEpisodesBy(episodesView.length?[...episodesView]:[...episodes], sort));
  },[sort, episodes]);

  useEffect(()=>{
    setEpisodesView(searchInEpisodes([...episodes], searchQuery))
  },[searchQuery]);

  return (
    <div>
      <ul>
        {
          episodesView.map((movieEpisode: MovieEpisode) =>
            <li 
              key={movieEpisode.title}
              className={movieEpisode.title==selectedEpisode?.title?'App-link ':''} 
              onClick={()=>onEpisodeSelected(movieEpisode)}>
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
