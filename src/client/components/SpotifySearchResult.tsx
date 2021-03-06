import React from "react";
import { Song } from "../model/Song";
import Image from "next/image";
import { ListItem, ListItemText, ListItemAvatar } from "@material-ui/core";
import { Typography } from "@material-ui/core";

interface SpotifySearchResultProps {
  song: Song;
  handleSelect: (song: Song) => void;
}

const SpotifySearchResult = ({ song, handleSelect }: SpotifySearchResultProps) => {

  const onSelect = () => {
    console.log(song);
    handleSelect(song);
  };

  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Image src={song.imageUrl} alt={song.name} width={50} height={50} />
      </ListItemAvatar>
      <ListItemText
        primary={song.name}
        secondary={
          <React.Fragment>
            <Typography
              sx={{ display: "inline" }}
              component="span"
              variant="body2"
              color="textPrimary"
            >
              {song.artist}
            </Typography>
            {" — " + song.album}
          </React.Fragment>
        }
      />
      <button className="spotify-search-result-button" onClick={onSelect}>
        Select
      </button>
    </ListItem>
  );
};

export default SpotifySearchResult;
