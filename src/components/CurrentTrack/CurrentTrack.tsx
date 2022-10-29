import axios from "axios";
import React, { useEffect } from "react";
import { ReducerCases } from "../../enums/reducer-cases";
import { useStateProvider } from "../../utils/StateProvider";

export default function CurrentTrack() {
  const [{ token, currentPlaying }, dispatch] = useStateProvider();

  useEffect(() => {
    const getCurrentTrack = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_SPOTIFY_API_URL}/me/player/currently-playing`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      if (response.data !== "") {
        const currentPlaying = {
          id: response.data.item.id,
          name: response.data.item.name,
          artists: response.data.item.artists.map((artist: any) => artist.name),
          image: response.data.item.album.images[2].url,
        };
        dispatch({ type: ReducerCases.SET_PLAYING, currentPlaying });
      } else {
        dispatch({ type: ReducerCases.SET_PLAYING, currentPlaying: null });
      }
    };

    getCurrentTrack();
  }, [token, dispatch]);

  return (
    <>
      {currentPlaying && (
        <div className="track">
          <div className="track-image">
            <img src={currentPlaying.image} alt="currentPlaying" />
          </div>
          <div className="track-info">
            <h4 className="track-info-track-name">{currentPlaying.name}</h4>
            <h6 className="track-info-track-artists">
              {currentPlaying.artists.join(", ")}
            </h6>
          </div>
        </div>
      )}
    </>
  );
}
