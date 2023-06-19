import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause,
} from "@fortawesome/free-solid-svg-icons";
import { playAudio } from "./util";

const SongTools = ({
  audioRef,
  currentSong,
  songIsPlaying,
  setSongIsPlaying,
  songTime,
  setSongTime,
  songs,
  setCurrentSong,
  setSongs,
}) => {
  useEffect(() => {
    const newSong = songs.map((song) => {
      if (song.id === currentSong.id) {
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
  }, [currentSong]);
  const toggleSongHandler = () => {
    if (songIsPlaying) {
      audioRef.current.pause();
      setSongIsPlaying(!songIsPlaying);
    } else {
      audioRef.current.play();
      setSongIsPlaying(!songIsPlaying);
    }
  };
  const dragHangler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongTime({ ...songTime, currentTime: e.target.value });
  };
  const getStartTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };
  const skipTrackHandler = (direction) => {
    let currentSongIndex = songs.findIndex(
      (song) => song.id === currentSong.id
    );
    if (direction === "skip-forwards") {
      setCurrentSong(songs[(currentSongIndex + 1) % songs.length]);
    }
    if (direction === "skip-backwards") {
      if ((currentSongIndex - 1) % songs.length === -1) {
        setCurrentSong(songs[songs.length - 1]);
        playAudio(songIsPlaying, audioRef);
        return;
      }
      setCurrentSong(songs[(currentSongIndex - 1) % songs.length]);
    }
    playAudio(songIsPlaying, audioRef);
  };
  return (
    <div className="MySongTools">
      <div className="time-control">
        <p>
          {songTime.currentTime ? getStartTime(songTime.currentTime) : "0:00"}
        </p>
        <input
          min={0}
          max={songTime.duration || 0}
          value={songTime.currentTime}
          onChange={dragHangler}
          type="range"
          name=""
          id=""
        />
        <p>{songTime.duration ? getStartTime(songTime.duration) : "0:00"}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon
          className="play-prev-btn"
          size="2x"
          icon={faAngleLeft}
          onClick={() => skipTrackHandler("skip-backwards")}
        />
        <FontAwesomeIcon
          onClick={toggleSongHandler}
          className="play-btn"
          size="2x"
          icon={songIsPlaying ? faPause : faPlay}
        />
        <FontAwesomeIcon
          className="play-next-btn"
          size="2x"
          icon={faAngleRight}
          onClick={() => skipTrackHandler("skip-forwards")}
        />
      </div>
    </div>
  );
};

export default SongTools;
