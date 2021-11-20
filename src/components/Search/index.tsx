import { useCallback, useEffect, useState } from "react";
import { useFilter } from "../../contexts/FilterContext";
import MovieTvItems from "../MovieTvItems";
import useSearch from "./hooks";
import { debounce } from "lodash";

interface SearchProps {
  searchString: string;
}

const Search: React.FunctionComponent<SearchProps> = ({ searchString }) => {
  const [debouncedSearchItem, setDebouncedSearchItem] =
    useState<string>(searchString);
  const { type } = useFilter();

  const { isLoading, data, isError, error } = useSearch(
    type,
    debouncedSearchItem
  );

  const debouncedUpdate = useCallback(
    debounce((searchString: string) => {
      setDebouncedSearchItem(searchString);
    }, 1000),
    []
  );
  useEffect(() => {
    debouncedUpdate(searchString);
  }, [searchString]);

  return isError ? (
    <div>{error as string}</div>
  ) : (
    <MovieTvItems isLoading={isLoading} items={data} />
  );
};

export default Search;
