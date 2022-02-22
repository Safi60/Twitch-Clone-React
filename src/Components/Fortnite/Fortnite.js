import React, { useState, useEffect, useContext } from "react";
import "../../styles/style.css";
import api from "../../Api";
import { Link } from "react-router-dom";
import { ThemeContext } from "../Context/ThemeContext";

export default function Fortnite() {
  const { theme } = useContext(ThemeContext);
  const [fortnite, setFortnite] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await api.get(
        "https://api.twitch.tv/helix/streams?first=10&game_id=33214&language=fr"
      );

      let dataArray = result.data.data;
      let fortniteArray = dataArray.map((fortnite) => {
        let picture = fortnite.thumbnail_url
          .replace("{width}", "310")
          .replace("{height}", "170");
        fortnite.thumbnail_url = picture;
        return fortnite;
      });

      let userIDs = fortniteArray.map((stream) => {
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

      const finalArray = fortniteArray.map((fortnite) => {
        fortnite.imageProfile = "";

        fortniteArray.forEach((fortnite) => {
          arrayUsers.forEach((user) => {
            if (fortnite.user_id === user.id) {
              fortnite.imageProfile = user.profile_image_url;
              fortnite.viewer = fortnite.viewer_count;
              fortnite.login = user.login;

              fortnite.viewer =
                Math.abs(fortnite.viewer) > 999
                  ? Math.sign(fortnite.viewer) *
                      (Math.abs(fortnite.viewer) / 1000).toFixed(1) +
                    "k"
                  : Math.sign(fortnite.viewer) * Math.abs(fortnite.viewer);
            }
          });
        });
        return fortnite;
      });
      setFortnite(finalArray);
    };
    fetchData();
  }, []);

  return (
    <div className="Fortnite">
      <h1 className="title-gameStream">
        Chaînes de <span>Fortnite</span> recommandées
      </h1>
      <div className="container-stream">
        {fortnite.map((fortnite, index) => (
          <div key={index} className="cardStream">
            <Link
              className="link-channel"
              to={{ pathname: `/${fortnite.login}` }}
            >
              <div className="containerCardStream">
                <img
                  src={fortnite.thumbnail_url}
                  alt="thumbnail"
                  className="cardstreamImg"
                />
                <div className="container-live">
                  <div>
                    <p>LIVE</p>
                  </div>
                </div>
                <div className="container-nbsp">
                  <div>{fortnite.viewer} spectateurs</div>
                </div>
              </div>
            </Link>
            <div className="cardBodyStreaming">
              {fortnite.imageProfile && (
                <img
                  src={fortnite.imageProfile}
                  alt="image de profil"
                  className="imgProfileTopStream"
                />
              )}
              <div className="container-infoStreaming">
                <h5 className="cardTitleStreaming">{fortnite.title}</h5>
                <p
                  className={`topStreamUserName ${
                    theme ? "dark-titleUserGame" : "light-titleUserGame"
                  }`}
                >
                  {fortnite.user_name}
                </p>
                <p className="topStreamNameGame">{fortnite.game_name}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
