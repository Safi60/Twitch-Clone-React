import React, { useState, useEffect, useContext } from "react";
import "../../styles/style.css";
import api from "../../Api";
import { Link } from "react-router-dom";
import { ThemeContext } from "../Context/ThemeContext";

export default function JustChatting() {
  const { theme } = useContext(ThemeContext);
  const [justChatting, setJustChatting] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await api.get(
        "https://api.twitch.tv/helix/streams?first=10&game_id=509658&language=fr"
      );

      let dataArray = result.data.data;
      let justChattingArray = dataArray.map((justChatting) => {
        let picture = justChatting.thumbnail_url
          .replace("{width}", "310")
          .replace("{height}", "170");
        justChatting.thumbnail_url = picture;
        return justChatting;
      });

      let userIDs = justChattingArray.map((stream) => {
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

      const finalArray = justChattingArray.map((justChatting) => {
        justChatting.imageProfile = "";

        justChattingArray.forEach((justChatting) => {
          arrayUsers.forEach((user) => {
            if (justChatting.user_id === user.id) {
              justChatting.imageProfile = user.profile_image_url;
              justChatting.viewer = justChatting.viewer_count;
              justChatting.login = user.login;

              justChatting.viewer =
                Math.abs(justChatting.viewer) > 999
                  ? Math.sign(justChatting.viewer) *
                      (Math.abs(justChatting.viewer) / 1000).toFixed(1) +
                    "k"
                  : Math.sign(justChatting.viewer) *
                    Math.abs(justChatting.viewer);
            }
          });
        });
        return justChatting;
      });
      setJustChatting(finalArray);
    };
    fetchData();
  }, []);

  return (
    <div className="JustChatting">
      <h1 className="title-gameStream">
        Chaînes de <span>Discussion</span> recommandées
      </h1>
      <div className="container-stream">
        {justChatting.map((justChatting, index) => (
          <div key={index} className="cardStream">
            <Link
              className="link-channel"
              to={{ pathname: `/${justChatting.login}` }}
            >
              <div className="containerCardStream">
                <img
                  src={justChatting.thumbnail_url}
                  alt="thumbnail"
                  className="cardstreamImg"
                />
                <div className="container-live">
                  <div>
                    <p>LIVE</p>
                  </div>
                </div>
                <div className="container-nbsp">
                  <div>{justChatting.viewer} spectateurs</div>
                </div>
              </div>
            </Link>
            <div className="cardBodyStreaming">
              {justChatting.imageProfile && (
                <img
                  src={justChatting.imageProfile}
                  alt="image de profil"
                  className="imgProfileTopStream"
                />
              )}
              <div className="container-infoStreaming">
                <h5 className="cardTitleStreaming">{justChatting.title}</h5>
                <p
                  className={`topStreamUserName ${
                    theme ? "dark-titleUserGame" : "light-titleUserGame"
                  }`}
                >
                  {justChatting.user_name}
                </p>
                <p className="topStreamNameGame">{justChatting.game_name}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
