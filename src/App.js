import React, { useState } from "react";
// Import styles
import "./styles/app.scss";

// Adding components
import Player from "./components/Player";
import Song from "./components/Song";
function App() {
  return (
    <div>
      <Song />
      <Player />
    </div>
  );
}

export default App;
