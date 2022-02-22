import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import api from "../../Api";
import "./ResultGame.css";
import { Link } from "react-router-dom";
import { ThemeContext } from "../Context/ThemeContext";
import "../../styles/style.css";

export default function ResultGame() {
  const { theme } = useContext(ThemeContext);
  let location = useLocation();

  const [resultGame, setResultGame] = useState([]);
  const [image, setImage] = useState([]);
  const [viewers, setViewers] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const result = await api.get(
        `https://api.twitch.tv/helix/streams?first=100&language=fr&game_id=${location.state.gameID}`
      );
      let dataArray = result.data.data;

      let gameNameURL = `https://api.twitch.tv/helix/games?id=${location.state.gameID}`;
      let getGameName = await api.get(gameNameURL);
      let arrayGameName = getGameName.data.data;

      let arrayImage = arrayGameName.map((image) => {
        let newURL = image.box_art_url
          .replace("{width}", "150")
          .replace("{height}", "205");
        image.box_art_url = newURL;
        return image;
      });

      let resultGameArray = dataArray.map((resultGame) => {
        let picture = resultGame.thumbnail_url
          .replace("{width}", "310")
          .replace("{height}", "170");
        resultGame.thumbnail_url = picture;
        return resultGame;
      });

      let totalViewers = resultGameArray.reduce((acc, val) => {
        return acc + val.viewer_count;
      }, 0);

      totalViewers =
        Math.abs(totalViewers) > 999
          ? Math.sign(totalViewers) *
              (Math.abs(totalViewers) / 1000).toFixed(1) +
            "k"
          : Math.sign(totalViewers) * Math.abs(totalViewers);

      let userIDs = resultGameArray.map((stream) => {
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

      const finalArray = resultGameArray.map((resultGame) => {
        resultGame.imageProfile = "";

        resultGameArray.forEach((resultGame) => {
          arrayUsers.forEach((user) => {
            if (resultGame.user_id === user.id) {
              resultGame.imageProfile = user.profile_image_url;
              resultGame.viewer = resultGame.viewer_count;
              resultGame.login = user.login;

              resultGame.viewer =
                Math.abs(resultGame.viewer) > 999
                  ? Math.sign(resultGame.viewer) *
                      (Math.abs(resultGame.viewer) / 1000).toFixed(1) +
                    "k"
                  : Math.sign(resultGame.viewer) * Math.abs(resultGame.viewer);
            }
          });
        });
        return resultGame;
      });
      setViewers(totalViewers);
      setResultGame(finalArray);
      setImage(arrayImage);
    };
    fetchData();
  }, [location.state.gameID]);

  return (
    <div className="ResultGame">
      <div className="containerInfoGame">
        {image.map((image, index) => (
          <div key={index} className="gameInfo">
            <div className="imageGameContainer">
              <img src={image.box_art_url} alt="" />
            </div>
            <div className="titleGame">
              <h1 className="titleResultGame">{image.name}</h1>
              <p className="viewersResult">{viewers} spectateurs</p>
            </div>
          </div>
        ))}
        <div className="container-stream">
          {resultGame.map((resultGame, index) => (
            <div key={index} className="cardStream">
              <Link
                className="link-channel"
                to={{ pathname: `/${resultGame.login}` }}
              >
                <div className="containerCardStream">
                  <img
                    src={resultGame.thumbnail_url}
                    alt="thumbnail"
                    className="cardstreamImg"
                  />
                  <div className="container-live">
                    <div>
                      <p>LIVE</p>
                    </div>
                  </div>
                  <div className="container-nbsp">
                    <div>{resultGame.viewer} spectateurs</div>
                  </div>
                </div>
              </Link>
              <div className="cardBodyStreaming">
                {resultGame.imageProfile && (
                  <img
                    src={resultGame.imageProfile}
                    alt="image de profil"
                    className="imgProfileTopStream"
                  />
                )}
                <div className="contaner-infoStreaming">
                  <h5 className="cardTitleStreaming">{resultGame.title}</h5>
                  <p
                    className={`topStreamUserName ${
                      theme ? "dark-titleUserGame" : "light-titleUserGame"
                    }`}
                  >
                    {resultGame.user_name}
                  </p>
                  <p className="topStreamNameGame">{resultGame.game_name}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
