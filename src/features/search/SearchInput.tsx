import { memo, useEffect } from "react";
import { debounceTime, Subject } from "rxjs";
// import { SEARCH_DEBOUNCE_TIME } from "../constants";
import './SearchInput.css';

const SEARCH_DEBOUNCE_TIME = 350;

const onSearch$ = new Subject<React.ChangeEvent<HTMLInputElement>>();
const SearchInput = ({ onSearch, value, placeholder, debounceDueTime=SEARCH_DEBOUNCE_TIME }: SearchInputPropType) => {
  useEffect(() => {
    const sub = onSearch$
      .pipe(debounceTime(debounceDueTime))
      .subscribe(({ target: { value } }) => onSearch(value));

    return () => sub?.unsubscribe();
  }, []);
  return (
    <>
      <input autoFocus defaultValue={value} type="search" placeholder={placeholder} onChange={(e) => onSearch$.next(e)} />
    </>
  );
};

export default memo(SearchInput);

