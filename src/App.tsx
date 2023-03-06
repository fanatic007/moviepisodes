import { Episodes } from './features/episodes/Episodes';
import './App.css';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { getEpisodes, loadEpisodesAsync, sortEpisodesBy } from './features/episodes/episodesSlice';
import { getSortKey, sortEpisodes, SortKey, SortState } from './features/episodes/sortSlice';
import { useEffect } from 'react';

function App() {
  const dispatch = useAppDispatch();
  const {episodes} = useAppSelector(getEpisodes);
  const {sort} = useAppSelector(getSortKey);
  useEffect(()=>{
    dispatch(loadEpisodesAsync());
  },[]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>moviepisodes</h1>
        <Episodes episodes={episodes} sort={sort} onSort={(sort:SortState)=>dispatch(sortEpisodes(sort))} />
      </header>
    </div>
  );
}

export default App;
