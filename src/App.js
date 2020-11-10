import React, { useState } from "react";
// Import styles
import "./styles/app.scss";

// Adding components
import Player from "./components/Player";
import Song from "./components/Song";

//Import data
import data from "./data";

function App() {
  const [song, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(song[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <div>
      <Song currentSong={currentSong} />
      <Player
        isPlaying={isPlaying}
        currentSong={currentSong}
        setIsPlaying={setIsPlaying}
      />
    </div>
  );
}

export default App;
