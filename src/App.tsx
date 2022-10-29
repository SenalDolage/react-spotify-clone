import React, { useEffect } from "react";
import { Login, Home } from "./components";
import { ReducerCases } from "./enums/reducer-cases";
import { useStateProvider } from "./utils/StateProvider";

export default function App() {
  const [{ token }, dispatch] = useStateProvider();

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const token = hash.substring(1).split("&")[0].split("=")[1];
      if (token) {
        dispatch({ type: ReducerCases.SET_TOKEN, token });
      }
    }
  }, [dispatch, token]);

  return <div className="app">{token ? <Home /> : <Login />}</div>;
}
