import { faL } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { playAudio } from "./util";

const SongThumbnail = ({
  song,
  setCurrentSong,
  songs,
  id,
  audioRef,
  songIsPlaying,
  setSongs,
}) => {
  const selectedSongHandler = () => {
    setCurrentSong(song);
    const newSong = songs.map((song) => {
      if (song.id === id) {
        return {
          ...song,
          active: true,
        };
      } else {
        return {
          ...song,
          active: false,
        };
      }
    });
    setSongs(newSong);
    playAudio(songIsPlaying, audioRef);
    // if (songIsPlaying) {
    //   const playPromise = audioRef.current.play();
    //   if (playPromise !== undefined) {
    //     playPromise.then((audio) => {
    //       audioRef.current.play();
    //     });
    //   }
    // }
  };
  return (
    <div
      onClick={selectedSongHandler}
      className={`MySongThumbnail ${song.active ? "selected" : ""}`}
    >
      <img src={song.cover} alt={song.name} />
      <div className="song-description">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
};

export default SongThumbnail;
