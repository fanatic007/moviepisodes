import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import TableSortHead from '../sort/TableSortHead';
import { sortEpisodesBy } from './episodesHelpers';
import { columnsConfig, getSortKey, sortEpisodes, SortState } from '../sort/sortSlice';
import './Episodes.css'

export function Episodes({episodes, selectedEpisode, onEpisodeSelected}:any) {
  const [episodesView, setEpisodesView] = useState(episodes);
  const dispatch = useAppDispatch();
  const {sort} = useAppSelector(getSortKey); 
  // const [selectedEpisodeID, setSelectedEpisodeID] = useState(-1);
  useEffect(()=>{
    setEpisodesView(sortEpisodesBy([...episodesView], sort));
  },[sort, episodes]);

  useEffect(()=>{
    setEpisodesView(sortEpisodesBy([...episodes], sort));
  },[episodes]);

  return (
    <table>
      <TableSortHead 
        sortState={sort} 
        onSort={(sort:SortState)=>dispatch(sortEpisodes(sort))}
        columnsConfig={columnsConfig}/>
        <tbody>
            {
              episodesView.map((episode:MovieEpisode)=>
                <tr 
                  key={episode.episode_id}
                  className={ Object.is(episode,selectedEpisode) ? 'selected':'' }
                  onClick={()=>onEpisodeSelected(episode)}
                  >
                  <td>EPISODE {episode.episode_id}</td>
                  <td>{episode.title}</td>
                  <td>{new Date(episode.release_date).getFullYear()}</td>
                </tr>
              )
            }
        </tbody>
    </table>
  );
}