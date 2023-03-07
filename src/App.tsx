import { useEffect, useState } from 'react';
import './App.css';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { Episodes } from './features/episodes/Episodes';
import { searchInEpisodes } from './features/episodes/episodesHelpers';
import { getEpisodes, loadEpisodesAsync } from './features/episodes/episodesSlice';
import SearchInput from './features/search/SearchInput';
import { getSearchQuery, searchEpisode } from './features/search/searchSlice';
import SelectedEpisode from './features/selectedEpisode/SelectedEpisode';
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
      </header>
      <aside>
        <SearchInput
            onSearch={(searchQuery:string)=>dispatch(searchEpisode(searchQuery))}
            placeholder={'Type to Search'}
          />
      </aside>
      {
        filteredEpisodes.length>0 &&
        <Episodes 
          episodes={filteredEpisodes}
          selectedEpisode={selectedEpisode}
          onEpisodeSelected={(selectedMovie:MovieEpisode)=>dispatch(selectEpisode(selectedMovie))}
        />
      }
      {
        !selectedEpisode && episodes.length>0 && <p>No Movie Selected</p>
      }
      {
        selectedEpisode &&
        <SelectedEpisode
          selectedEpisode={selectedEpisode}
        />
      } 
    </>
  );
}

export default App;
