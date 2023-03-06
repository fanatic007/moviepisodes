import sortReducer, {
  initialState,
  SortByState,
  sortEpisodes,
  SortKey
} from './sortSlice';

describe('sort reducer', () => {
  it('should handle initial state', () => {
    expect(sortReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should sort by episode', () => {
    const {sort} = sortReducer(initialState, sortEpisodes({key:SortKey.EPISODE, ascending:false}));
    expect(sort).toEqual({key:SortKey.EPISODE, ascending:false});
  });
});