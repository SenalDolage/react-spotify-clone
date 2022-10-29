import React from "react";
import { IoLibrary } from "react-icons/io5";
import { MdHomeFilled, MdSearch } from "react-icons/md";
import Playlists from "../Playlists/Playlists";

export default function Sidebar() {
  return (
    <div className="sidebar h-full">
      <div className="sidebar-content bg-gradient-to-r from-gray-800 to-gray-900 text-white py-10 px-5 h-full overflow-auto">
        <ul>
          <li className="flex items-center gap-2 cursor-pointer font-medium mb-5 lg:text-lg hover:text-green-400">
            <MdHomeFilled />
            <span>Home</span>
          </li>
          <li className="flex items-center gap-2 cursor-pointer font-medium mb-5 lg:text-lg hover:text-green-400">
            <MdSearch />
            <span>Search</span>
          </li>
          <li className="flex items-center gap-2 cursor-pointer font-medium mb-5 lg:text-lg hover:text-green-400">
            <IoLibrary />
            <span>Your Libary</span>
          </li>
        </ul>

        <div>
          <Playlists />
        </div>
      </div>
    </div>
  );
}
