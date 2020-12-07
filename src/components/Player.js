import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause,
} from "@fortawesome/free-solid-svg-icons";

export default function Player({
  currentSong,
  isPlaying,
  setIsPlaying,
  audioRef,
  setSongInfo,
  songInfo,
  song,
  setCurrentSong,
  setSongs,
}) {
  const activeLibraryHandler = (nextPrev) => {
    // Add active state
    const newSong = song.map((track) => {
      if (track.id === nextPrev.id) {
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
  };
  // Event Handler
  const playSongHandler = () => {
    isPlaying ? audioRef.current.pause() : audioRef.current.play();

    setIsPlaying(!isPlaying);
  };

  const getTime = (time) => {
    return (
      // Convert to time format
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };

  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };

  const skipTrackHandler = async (direction) => {
    let currentIndex = song.findIndex((track) => track.id === currentSong.id);

    if (direction === "skip-forw") {
      // From last to top of list
      await setCurrentSong(song[(currentIndex + 1) % song.length]);
      activeLibraryHandler(song[(currentIndex + 1) % song.length]);
    }
    if (direction === "skip-back") {
      // Check if start of list
      if ((currentIndex - 1) % song.length === -1) {
        await setCurrentSong(song[song.length - 1]);
        activeLibraryHandler(song[song.length - 1]);

        if (isPlaying) audioRef.current.play();

        return; // to stop this function from running next code
      }
      await setCurrentSong(song[(currentIndex - 1) % song.length]);
      activeLibraryHandler(song[(currentIndex - 1) % song.length]);
    }
    if (isPlaying) audioRef.current.play();
  };
  //State
  // Add Styles
  const trackAnim = {
    transform: `translateX(${songInfo.animationPercentage}%)`,
  };

  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <div className="track">
          <input
            min={0}
            max={songInfo.duration || 0}
            value={songInfo.currentTime}
            onChange={dragHandler}
            type="range"
            style={{
              background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`,
            }}
          />
          <div style={trackAnim} className="animate-track"></div>
        </div>
        <p>{songInfo.duration ? getTime(songInfo.duration) : "0:00"}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon
          onClick={() => skipTrackHandler("skip-back")}
          className="skip-back"
          icon={faAngleLeft}
          size="2x"
        />
        <FontAwesomeIcon
          onClick={playSongHandler}
          className="play"
          icon={!isPlaying ? faPlay : faPause}
          size="2x"
        />
        <FontAwesomeIcon
          onClick={() => skipTrackHandler("skip-forw")}
          className="skip-forw"
          icon={faAngleRight}
          size="2x"
        />
      </div>
    </div>
  );
}
