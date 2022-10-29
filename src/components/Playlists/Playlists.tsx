import axios from "axios";
import React, { useEffect } from "react";
import { ReducerCases } from "../../enums/reducer-cases";
import { useStateProvider } from "../../utils/StateProvider";

export default function Playlists() {
  const [{ token, playlists }, dispatch] = useStateProvider();

  useEffect(() => {
    const getPlaylistData = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_SPOTIFY_API_URL}/me/playlists`,
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
      const { items } = response.data;

      const playlists = items.map(({ name, id }: any) => {
        return { name, id };
      });
      dispatch({ type: ReducerCases.SET_PLAYLISTS, playlists });
    };

    getPlaylistData();
  }, [token, dispatch]);

  const changeCurrentPlaylist = (selectedPlaylistId: string) => {
    dispatch({ type: ReducerCases.SET_PLAYLIST_ID, selectedPlaylistId });
  };

  return (
    <div className="playlists py-5">
      <h4 className="text-lg uppercase font-bold mb-3">My Playlists</h4>
      <ul>
        {playlists?.map(({ name, id }: any) => {
          return (
            <li
              key={id}
              onClick={() => changeCurrentPlaylist(id)}
              className="cursor-pointer mb-3 text-md hover:text-green-400"
            >
              {name}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
