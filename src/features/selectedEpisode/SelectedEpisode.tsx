import './SelectedEpisode.css';

const SelectedEpisode = ({selectedEpisode, onCloseSelected }:SelectedEpisodePropType) => {
  return (
    <>      
      {
        !selectedEpisode && <p className='not-selected'>No Movie Selected</p>
      }
      {
        selectedEpisode && 
          <>
            <h3 className='star-wars'>{selectedEpisode.title}</h3>
            <button className='close-selected' onClick={onCloseSelected}>x</button>
            <p>{selectedEpisode.opening_crawl}</p>
            <h6>Directed By:{selectedEpisode.director}</h6>
          </>
      }
    </>
  )
}

export default SelectedEpisode;