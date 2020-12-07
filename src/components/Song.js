import React from "react";

export default function Song({ currentSong, isPlaying }) {
  return (
    <div>
      <div className={`song-container ${isPlaying ? "is-playing" : ""}`}>
        <img src={currentSong.cover}></img>
        <h2>{currentSong.name}</h2>
        <h3>{currentSong.artist}</h3>
      </div>
    </div>
  );
}
