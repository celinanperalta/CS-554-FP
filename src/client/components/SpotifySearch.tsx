import { useQuery } from "@apollo/client";
import React, { useCallback, useState } from "react";
import queries from "../queries";
import _, { debounce } from "lodash";
import { Song } from "../model/Song";
import SpotifySearchResult from "./SpotifySearchResult";

const SpotifySearch = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  const { data, loading, error } = useQuery(queries.SEARCH_QUERY, {
    variables: {
      query: search,
      page: 0,
    },
  });

  const debounceFn = useCallback(_.debounce(handleDebounceFn, 300), []);

  function handleDebounceFn(inputValue) {
    setSearch(inputValue);
  }

  function handleChange(event) {
    debounceFn(event.target.value);
  }

  return (
    <div>
      <h1>Spotify Search</h1>
      <label>
        Search:
        <input type="text" onChange={handleChange} />
      </label>
      {loading ? (
        <div>Loading...</div>
      ) : (
        data &&
        data.searchSongs && (
          <ul>
            {data.searchSongs.map((song : Song) => (
              <li key={song.id}><SpotifySearchResult song={song}/></li>
            ))}
          </ul>
        )
      )}
    </div>
  );
};

export default SpotifySearch;