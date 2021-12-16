import { useQuery } from "@apollo/client";
import React, { useCallback, useState } from "react";
import queries from "../queries";
import _, { debounce } from "lodash";
import { Song } from "../model/Song";
import SpotifySearchResult from "./SpotifySearchResult";
import { Card, CardContent, List } from "@material-ui/core";

const SpotifySearch = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(0);

  const { data, loading, error, fetchMore } = useQuery(queries.SEARCH_QUERY, {
    variables: {
      query: search,
      page: page,
    },
  });

  const debounceFn = useCallback(_.debounce(handleDebounceFn, 300), []);

  // Todo: Clear search results when search term changes
  function handleDebounceFn(inputValue) {
    setSearch(inputValue);
    setPage(0);
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
      console.log("loading more");
      fetchMore({
        variables: {
          page: page + 1,
        },
      });
      setPage(page + 1);
    }
  };

  return (
    <Card>
      <CardContent>
        <h2>Search Spotify</h2>
        <label>
          Search:
          <input type="text" onChange={handleChange} />
        </label>
        {loading ? (
          <div>Loading...</div>
        ) : (
          data &&
          data.searchSongs && (
            <div
              onScroll={loadMore}
              style={{
                maxHeight: "300px",
                overflow: "scroll",
                marginTop: "10px",
              }}
            >
              {data.searchSongs.map((song: Song) => (
                <SpotifySearchResult key={song.id} song={song} />
              ))}
            </div>
          )
        )}
      </CardContent>
    </Card>
  );
};

export default SpotifySearch;
