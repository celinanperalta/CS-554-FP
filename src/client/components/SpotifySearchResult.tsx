import React from "react";
import { Song } from "../model/Song";
import Image from "next/image";

interface SpotifySearchResultProps {
  song: Song;
}

const SpotifySearchResult = ({ song }: SpotifySearchResultProps) => {
  const handleSelect = () => {
    console.log(song);
  };

  return (
    <div className="spotify-search-result">
      <div className="spotify-search-result-image">
        <Image src={song.imageUrl} alt={song.name} width={50} height={50} />
      </div>
      <div className="spotify-search-result-info">
        <div className="spotify-search-result-title">{song.name}</div>
        <div className="spotify-search-result-artist">{song.artist}</div>
      </div>
      <div>
        <button className="spotify-search-result-button" onClick={handleSelect}>
          Select
        </button>
      </div>
    </div>
  );
};

export default SpotifySearchResult;
