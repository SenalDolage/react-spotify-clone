import axios from "axios";
import React, { useEffect } from "react";
import { AiFillClockCircle } from "react-icons/ai";
import { ReducerCases } from "../../enums/reducer-cases";
import { msToMinutesAndSeconds } from "../../utils/MillisecondsToMinutes";
import { useStateProvider } from "../../utils/StateProvider";

export default function Tracks() {
  const [{ token, selectedPlaylist, selectedPlaylistId }, dispatch] = useStateProvider();

  useEffect(() => {
    const getInitialPlaylist = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_SPOTIFY_API_URL}/playlists/${selectedPlaylistId}`,
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );

      const selectedPlaylist = {
        id: response.data.id,
        name: response.data.name,
        description: response.data.description.startsWith("<a")
          ? ""
          : response.data.description,
        image: response.data.images[0].url,
        tracks: response.data.tracks.items.map(({ track }: any) => ({
          id: track.id,
          name: track.name,
          artists: track.artists.map((artist: any) => artist.name),
          image: track.album.images[2].url,
          duration: track.duration_ms,
          album: track.album.name,
          context_uri: track.album.uri,
          track_number: track.track_number,
        })),
      };
      console.log(selectedPlaylist);

      dispatch({ type: ReducerCases.SET_PLAYLIST, selectedPlaylist });
    };

    getInitialPlaylist();
  }, [token, dispatch, selectedPlaylistId]);

  const playTrack = async (
    id: string,
    name: string,
    artists: any[],
    image: string,
    context_uri: string,
    track_number: number
  ) => {
    const response = await axios.put(
      `${process.env.REACT_APP_SPOTIFY_API_URL}/me/player/play`,
      {
        context_uri,
        offset: {
          position: track_number - 1,
        },
        position_ms: 0,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    if (response.status === 204) {
      const currentPlaying = {
        id,
        name,
        artists,
        image,
      };
      dispatch({ type: ReducerCases.SET_PLAYING, currentPlaying });
      dispatch({ type: ReducerCases.SET_PLAYER_STATE, playerState: true });
    } else {
      dispatch({ type: ReducerCases.SET_PLAYER_STATE, playerState: true });
    }
  };

  return (
    <div className="tracks py-10">
      {selectedPlaylist && (
        <div className="songs-list">
          <div className="playlist-header grid gap-2 items-center md:grid-cols-2">
            <div className="image">
              <img
                src={selectedPlaylist.image}
                alt="playlist"
                className="max-h-[400px] object-cover object-center"
              />
            </div>

            <div className="details text-white">
              <span className="type block text-base font-medium md:mb-5">
                PLAYLIST
              </span>
              <h1 className="title text-xl font-bold md:text-6xl md:mb-7">
                {selectedPlaylist.name}
              </h1>
              <p className="description text-lg">
                {selectedPlaylist.description}
              </p>
            </div>
          </div>

          <div className="list pt-5">
            <table className="table-auto w-full text-sm text-left text-white">
              <thead className="uppercase">
                <tr>
                  <th scope="col" className="py-3 px-6">
                    #
                  </th>
                  <th scope="col" className="py-3 px-6">
                    TITLE
                  </th>
                  <th scope="col" className="py-3 px-6">
                    ALBUM
                  </th>
                  <th scope="col" className="py-3 px-6">
                    <AiFillClockCircle />
                  </th>
                </tr>
              </thead>

              <tbody>
                {selectedPlaylist.tracks.map(
                  (
                    {
                      id,
                      name,
                      artists,
                      image,
                      duration,
                      album,
                      context_uri,
                      track_number,
                    }: any,
                    index: number
                  ) => {
                    return (
                      <tr
                        className="row border-b cursor-pointer hover:bg-green-500"
                        key={id}
                        onClick={() =>
                          playTrack(
                            id,
                            name,
                            artists,
                            image,
                            context_uri,
                            track_number
                          )
                        }
                      >
                        <td className="py-4 px-6">{index + 1}</td>
                        <td className="py-4 px-6">
                          <div className="md:flex gap-2 items-center">
                            <div className="image">
                              <img src={image} alt="track" />
                            </div>
                            <div className="info">
                              <h5 className="name mb-1">{name}</h5>
                              <h6>{artists}</h6>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">{album}</td>
                        <td className="py-4 px-6">
                          {msToMinutesAndSeconds(duration)}
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
