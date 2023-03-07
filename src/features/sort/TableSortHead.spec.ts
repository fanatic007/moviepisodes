import { columnsConfig } from "./sortSlice";
import { getNewSortState } from "./TableSortHead";

describe('table sorting', () => {
  let episodeSortState = {...columnsConfig[0]};
  it('get Correct Sort state based on after changing twice', () => {
    let newSortState = getNewSortState(episodeSortState,{...columnsConfig[2]});
    expect(newSortState.ascending).toEqual(true);
  });


  it('get Correct Sort state based on after changing twice', () => {
      let newSortState = getNewSortState(episodeSortState,{...columnsConfig[2]});
      newSortState = getNewSortState({...episodeSortState},newSortState);
      expect(newSortState.ascending).toEqual(false);
    });
});