import { ReducerCases } from "../enums/reducer-cases";

export const initialState = {
  token: null,
  userInfo: null,
  playlists: [],
  currentPlaying: null,
  playerState: false,
  selectedPlaylist: null,
  selectedPlaylistId: "37i9dQZF1E37jO8SiMT0yN",
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case ReducerCases.SET_TOKEN:
      return {
        ...state,
        token: action.token,
      };
    case ReducerCases.SET_USER:
      return {
        ...state,
        userInfo: action.userInfo,
      };
    case ReducerCases.SET_PLAYLISTS:
      return {
        ...state,
        playlists: action.playlists,
      };
    case ReducerCases.SET_PLAYING:
      return {
        ...state,
        currentPlaying: action.currentPlaying,
      };
    case ReducerCases.SET_PLAYER_STATE:
      return {
        ...state,
        playerState: action.playerState,
      };
    case ReducerCases.SET_PLAYLIST:
      return {
        ...state,
        selectedPlaylist: action.selectedPlaylist,
      };
    case ReducerCases.SET_PLAYLIST_ID:
      return {
        ...state,
        selectedPlaylistId: action.selectedPlaylistId,
      };
    default:
      return state;
  }
};

export default reducer;
