const SelectedEpisode = ({selectedEpisode}:any) => {
  return (
    <div>
      <h3>{selectedEpisode.title}</h3>
      <br/>
      <p>{selectedEpisode.opening_crawl}</p>
      <br/>
      <h6>Directed By:{selectedEpisode.director}</h6>
    </div>
  )
}

export default SelectedEpisode;