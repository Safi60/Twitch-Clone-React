import React, { useState, useEffect, useContext } from "react";
import "../../styles/style.css";
import api from "../../Api";
import { Link } from "react-router-dom";
import { ThemeContext } from "../Context/ThemeContext";

export default function TopStream() {
  const [topStream, setTopStream] = useState([]);

  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const fetchData = async () => {
      const result = await api.get(
        "https://api.twitch.tv/helix/streams?first=10&language=fr"
      );

      let dataArray = result.data.data;
      let topStreamArray = dataArray.map((topStream) => {
        let picture = topStream.thumbnail_url
          .replace("{width}", "310")
          .replace("{height}", "170");
        topStream.thumbnail_url = picture;
        return topStream;
      });

      let userIDs = topStreamArray.map((stream) => {
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

      const finalArray = topStreamArray.map((topStream) => {
        topStream.imageProfile = "";

        topStreamArray.forEach((topStream) => {
          arrayUsers.forEach((user) => {
            if (topStream.user_id === user.id) {
              topStream.imageProfile = user.profile_image_url;
              topStream.viewer = topStream.viewer_count;
              topStream.login = user.login;

              topStream.viewer =
                Math.abs(topStream.viewer) > 999
                  ? Math.sign(topStream.viewer) *
                      (Math.abs(topStream.viewer) / 1000).toFixed(1) +
                    "k"
                  : Math.sign(topStream.viewer) * Math.abs(topStream.viewer);
            }
          });
        });
        return topStream;
      });
      setTopStream(finalArray);
    };
    fetchData();
  }, []);

  return (
    <div className="Topstream">
      <h1
        className={`title-gameStream ${
          theme ? "dark-titleStream" : "light-titleStream"
        }`}
      >
        Chaînes live qui pourraient vous plaire
      </h1>
      <div className="container-stream">
        {topStream.map((topStream, index) => (
          <div key={index} className="cardStream">
            <Link
              className="link-channel"
              to={{ pathname: `/${topStream.login}` }}
            >
              <div className="containerCardStream">
                <img
                  src={topStream.thumbnail_url}
                  alt="thumbnail"
                  className="cardstreamImg"
                />
                <div className="container-live">
                  <div>
                    <p>LIVE</p>
                  </div>
                </div>
                <div className="container-nbsp">
                  <div>{topStream.viewer} spectateurs</div>
                </div>
              </div>
            </Link>
            <div className="cardBodyStreaming">
              {topStream.imageProfile && (
                <img
                  src={topStream.imageProfile}
                  alt="image de profil"
                  className="imgProfileTopStream"
                />
              )}
              <div className="container-infoStreaming">
                <h5 className="cardTitleStreaming">{topStream.title}</h5>
                <p
                  className={`topStreamUserName ${
                    theme ? "dark-titleUserGame" : "light-titleUserGame"
                  }`}
                >
                  {topStream.user_name}
                </p>
                <p className="topStreamNameGame">{topStream.game_name}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
