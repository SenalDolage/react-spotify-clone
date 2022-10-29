import React from "react";
import CurrentTrack from "../CurrentTrack/CurrentTrack";
import MainPlayerControls from "../MainPlayerControls/MainPlayerControls";
import PlayerVolume from "../PlayerVolume/PlayerVolume";

export default function Player() {
  return (
    <div className="footer bg-gradient-to-r from-gray-800 to-gray-700 text-white py-6 h-full flex items-center">
      <div className="footer-content container mx-auto">
        <div className="grid gap-3 md:grid-cols-3">
          <div className="current-track-wrap">
            <CurrentTrack />
          </div>

          <div className="controls">
            <MainPlayerControls />
          </div>

          <div className="volume-wrap">
            <PlayerVolume />
          </div>
        </div>
      </div>
    </div>
  );
}
