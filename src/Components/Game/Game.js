import React, { useState, useEffect, useContext } from "react";
import "./Game.css";
import api from "../../Api";
import { Link } from "react-router-dom";
import { ThemeContext } from "../Context/ThemeContext";

export default function Game() {
  const { theme } = useContext(ThemeContext);
  const [game, setGame] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await api.get(
        "https://api.twitch.tv/helix/games/top?first=10"
      );

      let dataArray = result.data.data;
      let arrayGames = dataArray.map((game) => {
        let newURL = game.box_art_url
          .replace("{width}", "150")
          .replace("{height}", "205");
        game.box_art_url = newURL;
        return game;
      });
      setGame(arrayGames);
    };
    fetchData();
  }, []);

  return (
    <div className="game">
      <h1 className="title-gameStream">
        Catégories qui pourraient vous plaire
      </h1>
      <div className="categories">
        {game.map((game, index) => (
          <Link
            className={`link-game ${theme ? "dark-game" : "light-game"}`}
            key={index}
            to={{
              pathname: `/directory/game/${game.name}`,
            }}
            state={{ gameID: game.id }}
          >
            <div className="cardGame">
              <div className="containerCardImd">
                <img
                  className="cardgameImg"
                  src={game.box_art_url}
                  alt="game profile"
                />
              </div>

              <div className="cardBodyGame">
                <h5 className="cardTitleGame">{game.name}</h5>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
