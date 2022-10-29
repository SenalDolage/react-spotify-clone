import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { ReducerCases } from "../../enums/reducer-cases";
import { useStateProvider } from "../../utils/StateProvider";
import { User } from "../../types/user";

export default function Header() {
  const [userInfo, setUserInfo] = useState<User>();
  const [{ token }, dispatch] = useStateProvider();

  useEffect(() => {
    const getUserInfo = async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_SPOTIFY_API_URL}/me`,
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
      const userInfo = {
        userId: data.id,
        userUrl: data.external_urls.spotify,
        name: data.display_name,
      };
      setUserInfo(userInfo);
      dispatch({ type: ReducerCases.SET_USER, userInfo });
    };

    getUserInfo();
  }, [dispatch, token]);

  return (
    <div className="header">
      <div className="grid gap2 md:grid-cols-2">
        <div className="search flex items-center relative">
          <FaSearch className="absolute left-[6px] top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Artists, songs, or podcasts"
            className="text-sm outline-none rounded-xl py-2 pr-2 pl-8 min-w-[240px] border-none"
          />
        </div>

        <div className="user-info text-right">
          <a
            href={userInfo?.userUrl}
            className="inline-flex gap-1 items-center text-white rounded-xl py-2 px-3 bg-gray-900 font-semibold text-sm"
          >
            <CgProfile />
            <span>{userInfo?.name}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
