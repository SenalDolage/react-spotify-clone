import React from "react";

export default function Login() {
  function handleConnectClick(): React.MouseEventHandler<HTMLButtonElement> | undefined {
    const scope = [
      "user-read-email",
      "user-read-private",
      "user-read-playback-state",
      "user-modify-playback-state",
      "user-read-currently-playing",
      "user-read-playback-position",
      "user-top-read",
      "user-read-recently-played",
    ];
    window.location.href = `${process.env.REACT_APP_SPOTIFY_API_URL}?client_id=${process.env.REACT_APP_SPOTIFY_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_SPOTIFY_REDIRECT_URL}&scope=${scope.join(" ")}&response_type=token&show_dialog=true`;
    return;
  }

  return (
    <div className="login bg-green-400">
      <div className="container mx-auto">
        <div className="min-h-screen py-6 flex items-center justify-center sm:py-12">
          <div className="py-6 px-3 bg-white shadow-lg min-w-[300px] min-h-[300px] flex flex-col items-center justify-center sm:min-w-[500px] sm:px-6">
            <img
              src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Black.png"
              className="h-[6vh] mb-10"
              alt="logo"
            />
            <h1 className="text-lg font-bold block mb-10 sm:text-2xl">
              Welcome to the Spotify Clone!
            </h1>
            <button
              className="primary-btn"
              onClick={() => handleConnectClick()}
            >
              Connect
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
