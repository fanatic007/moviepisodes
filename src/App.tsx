import { useEffect, useState } from 'react';
import './App.css';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { Episodes } from './features/episodes/Episodes';
import { searchInEpisodes } from './features/episodes/episodesHelpers';
import { FetchEpisodesState, getEpisodes, loadEpisodesAsync } from './features/episodes/episodesSlice';
import SearchInput from './features/search/SearchInput';
import { getSearchQuery, searchEpisode } from './features/search/searchSlice';
import SelectedEpisode from './features/selectedEpisode/SelectedEpisode';
import { getSelectedEpisode, selectEpisode } from './features/selectedEpisode/selectedEpisodeSlice';

function App() {
  const dispatch = useAppDispatch();
  const {episodes,status} = useAppSelector(getEpisodes);
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
      {  status === FetchEpisodesState.LOADING &&  <p className='star-wars not-selected'>loading....</p>    }
      {
        status === FetchEpisodesState.IDLE && 
        <>
          <SearchInput
            onSearch={(searchQuery:string)=>dispatch(searchEpisode(searchQuery))}
            placeholder={'Type to Search'}
          />
          <div className='list-details'>
              <div className='episodes'>
                <Episodes                
                  episodes={filteredEpisodes}
                  selectedEpisode={selectedEpisode}
                  onEpisodeSelected={(selectedMovie:MovieEpisode)=>dispatch(selectEpisode(selectedMovie))}
                />
              </div>
              <SelectedEpisode
                onCloseSelected={()=>dispatch(selectEpisode(null))}
                selectedEpisode={selectedEpisode}
              />          
          </div>
        </>
      }
    </>
  );
}

export default App;
