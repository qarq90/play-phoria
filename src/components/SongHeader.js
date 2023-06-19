import React from "react";

const SongHeader = ({ currentSong }) => {
  return (
    <div className="MySongDescription">
      <img src={currentSong.cover} alt={currentSong.name} />
      <h2>{currentSong.name}</h2>
      <h3>{currentSong.artist}</h3>
    </div>
  );
};

export default SongHeader;
