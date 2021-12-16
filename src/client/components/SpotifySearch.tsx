import { useQuery } from "@apollo/client";
import React, { useCallback, useState } from "react";
import queries from "../queries";
import _, { debounce } from "lodash";
import { Song } from "../model/Song";
import SpotifySearchResult from "./SpotifySearchResult";
import { Card, CardContent, List } from "@material-ui/core";

interface SpotifySearchProps {
  handleSelect: (song: Song) => void;
}

const SpotifySearch = ({ handleSelect }: SpotifySearchProps) => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(0);

  const { data, loading, error, fetchMore, refetch } = useQuery(
    queries.SEARCH_QUERY,
    {
      skip: !search,
      variables: {
        query: search,
        page: page,
      },
    }
  );

  const debounceFn = useCallback(_.debounce(handleDebounceFn, 300), []);

  // Todo: Clear search results when search term changes
  function handleDebounceFn(inputValue) {
    setSearch(inputValue);
    setPage(0);
    refetch({
      query: inputValue,
      page: 0,
    });
  }

  function handleChange(event) {
    debounceFn(event.target.value);
  }

  const loadMore = (event: React.UIEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (
      event.currentTarget.scrollTop + event.currentTarget.clientHeight ===
      event.currentTarget.scrollHeight
    ) {
      fetchMore({
        variables: {
          page: page + 1,
        },
      });
      setPage(page + 1);
    }
  };

  const searchResults = () => {
    if (loading) {
      return <div>Loading...</div>;
    }
    if (error) {
      return <div>Error: {error.message}</div>;
    }
    if (data && search) {
      if (data.searchSongs.length === 0) {
        return <div>No results found</div>;
      }
      return (
        <div
          onScroll={loadMore}
          style={{
            maxHeight: "300px",
            overflow: "scroll",
            marginTop: "10px",
          }}
        >
          {data.searchSongs.map((song: Song) => (
            <SpotifySearchResult
              key={song.id}
              song={song}
              handleSelect={handleSelect}
            />
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardContent>
        <h2>Search Spotify</h2>
        <label>
          Search:
          <input type="text" onChange={handleChange} />
        </label>
        {searchResults()}
      </CardContent>
    </Card>
  );
};

export default SpotifySearch;
