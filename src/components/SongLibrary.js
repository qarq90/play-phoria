import React from "react";
import SongThumbnail from "./SongThumbnail";

const SongLibrary = ({
  songs,
  setCurrentSong,
  audioRef,
  songIsPlaying,
  setSongs,
  album,
}) => {
  return (
    <div className={`library ${album ? "active-library" : ""}`}>
      <h2>Library</h2>
      <div className="library-songs">
        {songs.map((song) => (
          <SongThumbnail
            song={song}
            setCurrentSong={setCurrentSong}
            songs={songs}
            id={song.id}
            key={song.id}
            audioRef={audioRef}
            songIsPlaying={songIsPlaying}
            setSongs={setSongs}
          />
        ))}
      </div>
    </div>
  );
};

export default SongLibrary;
