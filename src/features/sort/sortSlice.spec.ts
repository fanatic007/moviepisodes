import sortReducer, {
  columnsConfig,
  initialState,
  sortEpisodes,
  SortKey,
} from './sortSlice';

describe('sort reducer', () => {
  it('should handle initial state', () => {
    expect(sortReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should sort by episode ascending', () => {
    let episodeSortState = {...columnsConfig[0]};
    episodeSortState.ascending = true;
    const {sort} = sortReducer(initialState, sortEpisodes(episodeSortState));
    expect(sort).toEqual({key:SortKey.EPISODE , ascending:true, header:columnsConfig[0].header});
  });
});