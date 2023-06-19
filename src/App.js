import React, { useState, useRef } from "react";
import "./styles/app.scss";
import SongNav from "./components/SongNav";
import SongHeader from "./components/SongHeader";
import SongTools from "./components/SongTools";
import SongLibrary from "./components/SongLibrary";
import data from "./data";

function App() {
  const audioRef = useRef(null);
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [songIsPlaying, setSongIsPlaying] = useState(false);
  const [songTime, setSongTime] = useState({
    time: 0,
    duration: 0,
  });
  const [album, setAlbum] = useState(false);
  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    setSongTime({ ...songTime, currentTime: current, duration });
  };
  const songEndHandler = () => {
    let currentSongIndex = songs.findIndex(
      (song) => song.id === currentSong.id
    );
    setCurrentSong(songs[(currentSongIndex + 1) % songs.length]);
    if (songIsPlaying) audioRef.current.play();
  };
  return (
    <div className="App">
      <div className={`${album ? "main-body-active" : "main-body-inactive"}`}>
        <SongNav album={album} setAlbum={setAlbum} />
        <SongHeader currentSong={currentSong} />
        <SongTools
          audioRef={audioRef}
          songIsPlaying={songIsPlaying}
          setSongIsPlaying={setSongIsPlaying}
          currentSong={currentSong}
          setSongTime={setSongTime}
          songTime={songTime}
          songs={songs}
          setCurrentSong={setCurrentSong}
          setSongs={setSongs}
        />
      </div>
      <SongLibrary
        audioRef={audioRef}
        songs={songs}
        setCurrentSong={setCurrentSong}
        songIsPlaying={songIsPlaying}
        setSongs={setSongs}
        album={album}
      />
      <audio
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
        onEnded={songEndHandler}
      ></audio>
    </div>
  );
}

export default App;
