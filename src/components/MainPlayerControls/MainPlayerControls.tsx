import axios from "axios";
import React from "react";
import {
  BsFillPlayCircleFill,
  BsFillPauseCircleFill,
  BsShuffle,
} from "react-icons/bs";
import { CgPlayTrackNext, CgPlayTrackPrev } from "react-icons/cg";
import { FiRepeat } from "react-icons/fi";
import { ReducerCases } from "../../enums/reducer-cases";
import { useStateProvider } from "../../utils/StateProvider";

export default function MainPlayerControls() {
  const [{ token, playerState }, dispatch] = useStateProvider();

  const changeState = async () => {
    const state = playerState ? "pause" : "play";
    await axios.put(
      `${process.env.REACT_APP_SPOTIFY_API_URL}/me/player/${state}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    dispatch({
      type: ReducerCases.SET_PLAYER_STATE,
      playerState: !playerState,
    });
  };

  const changeTrack = async (type: string) => {
    console.log(type);
  };

  return (
    <div className="main-controls flex gap-4 justify-center items-center">
      <div className="shuffle">
        <BsShuffle className="cursor-pointer" size={20} />
      </div>
      <div className="previous">
        <CgPlayTrackPrev
          onClick={() => changeTrack("previous")}
          className="cursor-pointer"
          size={30}
        />
      </div>
      <div className="state">
        {playerState ? (
          <BsFillPauseCircleFill
            onClick={changeState}
            className="cursor-pointer"
            size={30}
          />
        ) : (
          <BsFillPlayCircleFill
            onClick={changeState}
            className="cursor-pointer"
            size={30}
          />
        )}
      </div>
      <div className="next">
        <CgPlayTrackNext
          onClick={() => changeTrack("next")}
          className="cursor-pointer"
          size={30}
        />
      </div>
      <div className="repeat">
        <FiRepeat className="cursor-pointer" size={20} />
      </div>
    </div>
  );
}
