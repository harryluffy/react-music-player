import React from "react";

export default function LibrarySong({
  song,
  songs,
  setCurrentSong,
  audioRef,
  isPlaying,
  setSongs,
}) {
  const songSelectHandler = async () => {
    const selectedSong = songs.filter((state) => state.id === song.id);
    await setCurrentSong(selectedSong[0]);

    // Add active state
    const newSong = songs.map((track) => {
      if (track.id === song.id) {
        return {
          ...track,
          active: true,
        };
      } else {
        return {
          ...track,
          active: false,
        };
      }
    });
    setSongs(newSong);

    //check if song is playing
    if (isPlaying) audioRef.current.play();
  };

  return (
    <div>
      <div
        onClick={songSelectHandler}
        className={`library-Song ${song.active ? "selected" : ""}`}
      >
        <img src={song.cover}></img>
        <div className="song-description">
          <h3>{song.name}</h3>
          <h4>{song.artist}</h4>
        </div>
      </div>
    </div>
  );
}
