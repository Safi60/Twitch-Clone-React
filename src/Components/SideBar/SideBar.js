import React, { useContext } from "react";
import "./SideBar.css";
import { useState, useEffect } from "react";
import api from "../../Api";
import arrow from "./arrow.svg";
import { Link } from "react-router-dom";
import { ThemeContext } from "../Context/ThemeContext";
import { useMediaQuery } from "react-responsive";

export default function SideBar() {
  const { theme } = useContext(ThemeContext);

  const [sideBar, setSideBar] = useState(false);

  const toggleSideBar = () => {
    setSideBar(!sideBar);
  };

  const isTabletOrMobile = useMediaQuery({
    query: "(max-width: 1200px)",
  });

  const [topStreams, setTopStreams] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await api.get(
        "https://api.twitch.tv/helix/streams?language=fr"
      );

      let dataArray = result.data.data;

      let gameIDs = dataArray.map((stream) => {
        return stream.game_id;
      });

      let userIDs = dataArray.map((stream) => {
        return stream.user_id;
      });

      let baseURLGames = "https://api.twitch.tv/helix/games?";
      let baseURLUsers = "https://api.twitch.tv/helix/users?";

      let queryParamsGames = "";
      let queryParamsUsers = "";

      gameIDs.map((id) => {
        return (queryParamsGames = queryParamsGames + `id=${id}&`);
      });

      userIDs.map((id) => {
        return (queryParamsUsers = queryParamsUsers + `id=${id}&`);
      });

      let finalURLGames = baseURLGames + queryParamsGames;
      let finalURLUsers = baseURLUsers + queryParamsUsers;

      let getGameNames = await api.get(finalURLGames);
      let getUsers = await api.get(finalURLUsers);

      let arrayGames = getGameNames.data.data;
      let arrayUsers = getUsers.data.data;

      const finalArray = dataArray.map((stream) => {
        stream.gameName = "";
        stream.imageProfile = "";
        stream.login = "";
        stream.viewer = "";

        arrayGames.forEach((name) => {
          arrayUsers.forEach((user) => {
            if (stream.user_id === user.id && stream.game_id === name.id) {
              stream.imageProfile = user.profile_image_url;
              stream.gameName = name.name;
              stream.login = user.login;
              stream.viewer = stream.viewer_count;

              stream.viewer =
                Math.abs(stream.viewer) > 999
                  ? Math.sign(stream.viewer) *
                      (Math.abs(stream.viewer) / 1000).toFixed(1) +
                    "k"
                  : Math.sign(stream.viewer) * Math.abs(stream.viewer);
            }
          });
        });
        return stream;
      });

      setTopStreams(finalArray.slice(0, 10));
    };
    fetchData();
  }, []);

  return (
    <div className="Sidebar">
      {!sideBar && !isTabletOrMobile ? (
        <div className={`show-sidebar ${theme && "dark-sidebar"}`}>
          <div className="container-chanel-sidebar">
            <h2 className="title-sidebar">Chaînes recommandées</h2>
            <img
              onClick={toggleSideBar}
              src={arrow}
              alt="arrow"
              className="arrow"
            />
          </div>
          <ul className="stream-list">
            {topStreams.map((stream, index) => (
              <Link
                className="link-sidebar"
                key={index}
                to={{ pathname: `/${stream.login}` }}
              >
                <li className="listSideBar">
                  {stream.imageProfile && (
                    <img
                      src={stream.imageProfile}
                      alt="profil"
                      className="imgProfile"
                    />
                  )}
                  <div className={`streamUser ${theme ? "dark" : "light"}`}>
                    {stream.user_name}
                  </div>
                  <div
                    className={`viewer ${
                      theme ? "dark-viewer" : "light-viewer"
                    }`}
                  >
                    <div className="redPoint"></div>
                    <div>{stream.viewer}</div>
                  </div>
                  <div
                    className={`gameNameSidebar ${
                      theme ? "dark-gameName" : "light-gameName"
                    }`}
                  >
                    {stream.gameName}
                  </div>
                </li>
              </Link>
            ))}
          </ul>
        </div>
      ) : (
        <div className={`mask-sidebar ${theme && "dark-sidebar"}`}>
          <ul className="stream-list">
            <img
              onClick={toggleSideBar}
              src={arrow}
              alt="arrow mask"
              className="arrow-mask-sidebar"
            />
            {topStreams.map((stream, index) => (
              <Link
                className="link-sidebar"
                key={index}
                to={{ pathname: `/${stream.login}` }}
              >
                <li className="listSideBar">
                  {stream.imageProfile && (
                    <img
                      src={stream.imageProfile}
                      alt="profil mask"
                      className="imgProfile"
                    />
                  )}
                </li>
              </Link>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
