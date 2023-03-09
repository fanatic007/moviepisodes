import { useEffect, useState } from 'react';
import './App.css';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { FetchEpisodesState } from './constants';
import { Episodes } from './features/episodes/Episodes';
import { searchInEpisodes } from './features/episodes/episodesHelpers';
import { getEpisodes, loadEpisodesAsync } from './features/episodes/episodesSlice';
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
            value={searchQuery}
          />
          <div className='list-details'>
              <div className='episodes'>
                <Episodes                
                  episodes={filteredEpisodes}
                  selectedEpisode={selectedEpisode}
                  onEpisodeSelected={(selectedMovie:MovieEpisode)=>dispatch(selectEpisode(selectedMovie))}
                />
              </div>
              <div className='movie-card'>      
                <SelectedEpisode
                  onCloseSelected={()=>dispatch(selectEpisode(null))}
                  selectedEpisode={selectedEpisode}
                />               
              </div>         
          </div>
        </>
      }
    </>
  );
}

export default App;
