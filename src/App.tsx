import { useEffect, useState } from 'react';
import './App.css';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { Episodes } from './features/episodes/Episodes';
import { searchInEpisodes } from './features/episodes/episodesHelpers';
import { getEpisodes, loadEpisodesAsync } from './features/episodes/episodesSlice';
import { getSearchQuery, searchEpisode } from './features/search/searchSlice';
import { getSelectedEpisode, selectEpisode } from './features/selectedEpisode/selectedEpisodeSlice';

function App() {
  const dispatch = useAppDispatch();
  const {episodes} = useAppSelector(getEpisodes);
  const {searchQuery} = useAppSelector(getSearchQuery);
  const {selectedEpisode} = useAppSelector(getSelectedEpisode);
  const [filteredEpisodes, setFilteredEpisodes] = useState([] as MovieEpisode[]);
  useEffect(()=>{
    dispatch(loadEpisodesAsync());
  },[]);

  useEffect(()=>{
    setFilteredEpisodes(searchInEpisodes([...episodes], searchQuery));
  },[searchQuery]);

  useEffect(()=>{
    setFilteredEpisodes([...episodes])
  },[episodes]);

  return (
    <div className="App">
      <header>
        <h1>moviepisodes</h1>
        <input type='search' onChange={(e)=>dispatch(searchEpisode(e.target.value))}/>
      </header>
      <h2>{selectedEpisode?.title}</h2>
      <Episodes 
        episodes={filteredEpisodes}
        selectedEpisode={selectedEpisode}
        onEpisodeSelected={(selectedMovie:MovieEpisode)=>dispatch(selectEpisode(selectedMovie))}
      /> 
    </div>
  );
}

export default App;
