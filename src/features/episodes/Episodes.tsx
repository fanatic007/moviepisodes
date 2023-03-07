import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import TableSortHead from '../sort/TableSortHead';
import Table from '../sort/TableSortHead';
import { sortEpisodesBy } from './episodesHelpers';
import { columnsConfig, getSortKey, sortEpisodes, SortState } from '../sort/sortSlice';

export function Episodes({episodes, selectedEpisode, onEpisodeSelected}:any) {
  const [episodesView, setEpisodesView] = useState(episodes);
  const dispatch = useAppDispatch();
  const {sort} = useAppSelector(getSortKey); 
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
              episodesView.map(({episode_id, title, release_date}:any)=>
                <tr key={episode_id}>
                  <td>{episode_id}</td>
                  <td>{title}</td>
                  <td>{new Date(release_date).getFullYear()}</td>
                </tr>
              )
            }
        </tbody>
    </table>
  );
}