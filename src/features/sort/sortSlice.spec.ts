import { SortKey } from '../../constants';
import sortReducer, {
  columnsConfig,
  sortInitialState,
  sortEpisodes
} from './sortSlice';

describe('sort reducer', () => {
  it('should handle initial state', () => {
    expect(sortReducer(undefined, { type: 'unknown' })).toEqual(sortInitialState);
  });

  it('should sort by episode ascending', () => {
    let episodeSortState = {...columnsConfig[0]};
    episodeSortState.ascending = true;
    const {sort} = sortReducer(sortInitialState, sortEpisodes(episodeSortState));
    expect(sort).toEqual({key:SortKey.EPISODE , ascending:true, header:columnsConfig[0].header});
  });
});