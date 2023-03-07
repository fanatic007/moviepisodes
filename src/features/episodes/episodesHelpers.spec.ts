import { searchInEpisodes, sortEpisodesBy } from './episodesHelpers';
import { EPISODES } from './episodesSlice.spec';
import { columnsConfig, initialState } from '../sort/sortSlice';

describe('episodes search and sort', () => {
  it('search in episode', () => {
    let searchResult = searchInEpisodes([...EPISODES],'new');
    expect(searchResult.length).toEqual(1);
    expect(searchResult[0].title).toContain('new');
  });
  it('search blank in episode', () => {
    let searchResult = searchInEpisodes([...EPISODES],'');
    expect(searchResult.length).toEqual([...EPISODES].length);
  });

  it('sort episodes by Year asc', () => {
    let sortedResult = sortEpisodesBy([...EPISODES],initialState.sort);
    expect(sortedResult[0].title).toContain('new');
  });

  it('sort episodes by title dsc', () => {
    let episodeSortState = {...columnsConfig[0]};
    episodeSortState.ascending = !episodeSortState.ascending;
    let sortedResult = sortEpisodesBy([...EPISODES],episodeSortState);
    expect(sortedResult[0].title).toContain('new');
  });
});