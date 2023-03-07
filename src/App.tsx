import { useEffect, useState } from 'react';
import './App.css';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { Episodes } from './features/episodes/Episodes';
import { searchInEpisodes } from './features/episodes/episodesHelpers';
import { getEpisodes, loadEpisodesAsync } from './features/episodes/episodesSlice';
import SearchInput from './features/search/SearchInput';
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
    <>
      <header>
        <h1>moviepisodes</h1>
        <SearchInput
          onSearch={(searchQuery:string)=>dispatch(searchEpisode(searchQuery))}
        />
      </header>
      <h2>{selectedEpisode?.title}</h2>
      {
        filteredEpisodes &&
        <Episodes 
          episodes={filteredEpisodes}
          selectedEpisode={selectedEpisode}
          onEpisodeSelected={(selectedMovie:MovieEpisode)=>dispatch(selectEpisode(selectedMovie))}
        />
      } 
    </>
  );
}

export default App;
