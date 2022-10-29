import React from "react";
import Player from "../Player/Player";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import Tracks from "../Tracks/Tracks";

export default function Home() {
  return (
    <div className="spotify h-[100vh] overflow-hidden">
      <div className="spotify-content bg-gradient-to-r from-green-800 to-green-600 h-[90vh] flex items-stretch overflow-hidden">
        <div className="grid gap-4 w-full md:grid-cols-4">
          <div className="left-col overflow-auto md:col-span-1">
            <Sidebar />
          </div>
          <div className="right-col inner-body-content overflow-y-auto px-10 py-10 md:col-span-3">
            <Header />
            <Tracks />
          </div>
        </div>
      </div>

      <div className="footer-wrap h-[10vh]">
        <Player />
      </div>
    </div>
  );
}
