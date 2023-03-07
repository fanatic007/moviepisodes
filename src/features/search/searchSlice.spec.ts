import searchReducer, { searchEpisode, SearchState } from './searchSlice';

describe('search reducer', () => {
  const initialState: SearchState = {
    searchQuery: ''
  };

  it('should handle initial state', () => {
    const {searchQuery} = searchReducer(undefined, { type: 'unknown' });
    expect(searchQuery).toEqual('');
  });

  it('should search in episodes', () => {
    const {searchQuery} = searchReducer(initialState, searchEpisode('jedi'));
    expect(searchQuery).toEqual('jedi');
  });
});
