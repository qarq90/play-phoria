export const playAudio = (songIsPlaying, audioRef) => {
  if (songIsPlaying) {
    const playPromise = audioRef.current.play();
    if (playPromise !== undefined) {
      playPromise.then((audio) => {
        audioRef.current.play();
      });
    }
  }
};
