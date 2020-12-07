import React from "react";
import LibrarySong from "./LibrarySong";

export default function Library({
  song,
  setCurrentSong,
  audioRef,
  isPlaying,
  setSongs,
  libraryStatus,
}) {
  return (
    <div className={`library ${libraryStatus ? "active-library" : ""}`}>
      <h2>Library</h2>
      <div className="library-song">
        {song.map((track) => (
          <LibrarySong
            setCurrentSong={setCurrentSong}
            song={track}
            songs={song}
            key={track.id}
            audioRef={audioRef}
            isPlaying={isPlaying}
            setSongs={setSongs}
          />
        ))}
      </div>
    </div>
  );
}
