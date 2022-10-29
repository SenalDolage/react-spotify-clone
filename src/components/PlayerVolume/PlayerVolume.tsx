import axios from "axios";
import React from "react";
import { BsVolumeDownFill } from "react-icons/bs";
import { useStateProvider } from "../../utils/StateProvider";

export default function PlayerVolume() {
  const [{ token }] = useStateProvider();

  const setVolume = async (e: any) => {
    await axios.put(
      `${process.env.REACT_APP_SPOTIFY_API_URL}/me/player/volume`,
      {},
      {
        params: {
          volume_percent: parseInt(e.target.value),
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
  };

  return (
    <div className="volume flex gap-2 justify-center items-center md:justify-end">
      <BsVolumeDownFill size={25}/>
      <input type="range" onMouseUp={(e) => setVolume(e)} min={0} max={100} className="cursor-pointer" />
    </div>
  );
}
