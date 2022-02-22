import React, { useState, useEffect, useContext } from "react";
import "../../styles/style.css";
import api from "../../Api";
import { Link } from "react-router-dom";
import { ThemeContext } from "../Context/ThemeContext";

export default function LeagueOfLegends() {
  const { theme } = useContext(ThemeContext);
  const [leagueOfLegends, setLeagueOfLegends] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await api.get(
        "https://api.twitch.tv/helix/streams?first=10&game_id=21779&language=fr"
      );

      let dataArray = result.data.data;
      let leagueOfLegendsArray = dataArray.map((leagueOfLegends) => {
        let picture = leagueOfLegends.thumbnail_url
          .replace("{width}", "310")
          .replace("{height}", "170");
        leagueOfLegends.thumbnail_url = picture;
        return leagueOfLegends;
      });

      let userIDs = leagueOfLegendsArray.map((stream) => {
        return stream.user_id;
      });

      let baseURLUsers = "https://api.twitch.tv/helix/users?";
      let queryParamsUsers = "";

      userIDs.map((id) => {
        return (queryParamsUsers = queryParamsUsers + `id=${id}&`);
      });

      let finalURLUsers = baseURLUsers + queryParamsUsers;

      let getUsers = await api.get(finalURLUsers);
      let arrayUsers = getUsers.data.data;

      const finalArray = leagueOfLegendsArray.map((leagueOfLegends) => {
        leagueOfLegends.imageProfile = "";

        leagueOfLegendsArray.forEach((leagueOfLegends) => {
          arrayUsers.forEach((user) => {
            if (leagueOfLegends.user_id === user.id) {
              leagueOfLegends.imageProfile = user.profile_image_url;
              leagueOfLegends.viewer = leagueOfLegends.viewer_count;
              leagueOfLegends.login = user.login;

              leagueOfLegends.viewer =
                Math.abs(leagueOfLegends.viewer) > 999
                  ? Math.sign(leagueOfLegends.viewer) *
                      (Math.abs(leagueOfLegends.viewer) / 1000).toFixed(1) +
                    "k"
                  : Math.sign(leagueOfLegends.viewer) *
                    Math.abs(leagueOfLegends.viewer);
            }
          });
        });
        return leagueOfLegends;
      });
      setLeagueOfLegends(finalArray);
    };
    fetchData();
  }, []);

  return (
    <div className="LeagueOfLegends">
      <h1 className="title-gameStream">
        Chaînes de <span>League of Legends</span> recommandées
      </h1>
      <div className="container-stream">
        {leagueOfLegends.map((leagueOfLegends, index) => (
          <div key={index} className="cardStream">
            <Link
              className="link-channel"
              to={{ pathname: `/${leagueOfLegends.login}` }}
            >
              <div className="containerCardStream">
                <img
                  src={leagueOfLegends.thumbnail_url}
                  alt="thumbnail"
                  className="cardstreamImg"
                />
                <div className="container-live">
                  <div>
                    <p>LIVE</p>
                  </div>
                </div>
                <div className="container-nbsp">
                  <div>{leagueOfLegends.viewer} spectateurs</div>
                </div>
              </div>
            </Link>
            <div className="cardBodyStreaming">
              {leagueOfLegends.imageProfile && (
                <img
                  src={leagueOfLegends.imageProfile}
                  alt="image de profil"
                  className="imgProfileTopStream"
                />
              )}
              <div className="container-infoStreaming">
                <h5 className="cardTitleStreaming">{leagueOfLegends.title}</h5>
                <p
                  className={`topStreamUserName ${
                    theme ? "dark-titleUserGame" : "light-titleUserGame"
                  }`}
                >
                  {leagueOfLegends.user_name}
                </p>
                <p className="topStreamNameGame">{leagueOfLegends.game_name}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
