import { Episodes } from './features/episodes/Episodes';
import './App.css';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { getEpisodes, loadEpisodesAsync, searchInEpisodes, sortEpisodesBy } from './features/episodes/episodesSlice';
import { getSortKey, sortEpisodes, SortKey, SortState } from './features/episodes/sortSlice';
import { SyntheticEvent, useEffect } from 'react';
import { getSearchQuery, searchEpisode } from './features/search/searchSlice';
import { getSelectedEpisode, selectEpisode } from './features/selectedEpisode/selectedEpisodeSlice';

function App() {
  const dispatch = useAppDispatch();
  const {episodes} = useAppSelector(getEpisodes);
  const {sort} = useAppSelector(getSortKey);
  const {searchQuery} = useAppSelector(getSearchQuery);
  const {selectedEpisode} = useAppSelector(getSelectedEpisode);
  useEffect(()=>{
    dispatch(loadEpisodesAsync());
  },[]);

  return (
    <div className="App">
      <header>
        <h1>moviepisodes</h1>
        <input type='search' onChange={(e)=>dispatch(searchEpisode(e.target.value))}/>
      </header>
      <h2>{selectedEpisode?.title}</h2>
      <Episodes 
        searchQuery={searchQuery}
        episodes={episodes}
        sort={sort}
        selectedEpisode={selectedEpisode}
        onEpisodeSelected={(selectedMovie:MovieEpisode)=>dispatch(selectEpisode(selectedMovie))}
        onSort={(sort:SortState)=>dispatch(sortEpisodes(sort))}
      /> 
    </div>
  );
}

export default App;
