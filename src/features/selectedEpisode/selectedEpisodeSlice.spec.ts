import { EPISODES } from '../../constants';
import selectedEpisodeReducer, { SelectedEpisode, selectEpisode } from './selectedEpisodeSlice';

describe('selected movie reducer', () => {
  const initialState: SelectedEpisode = {
    selectedEpisode: null
  };

  it('should handle initial state', () => {
    const {selectedEpisode} = selectedEpisodeReducer(undefined, { type: 'unknown' });
    expect(selectedEpisode).toEqual(null);
  });

  it('should select episode', () => {
    const {selectedEpisode} = selectedEpisodeReducer(initialState, selectEpisode(EPISODES[0]));
    expect(selectedEpisode).toEqual(EPISODES[0]);
  });
});
