import React, { useState, useContext } from "react";
import IconeTwitch from "./IconeTwitch.svg";
import PointList from "./PointList.svg";
import Settings from "./Settings.svg";
import CadeauPrime from "./CadeauPrime.svg";
import MagnifyingGlassSearch from "./MagnifyingGlassSearch.svg";
import "./Header.css";
import { Link } from "react-router-dom";
import { ThemeContext } from "../Context/ThemeContext";

export default function Header() {
  const [searchInput, setSearchInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleKeyPress = (e) => {
    setSearchInput(e.target.value);
  };

  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="Header">
      <nav className={`headerTop ${theme && "dark-header"}`}>
        <ul className="list-menu">
          <li className="list-nav">
            <Link className="link-header" to="/">
              <img
                src={IconeTwitch}
                alt="logo twitch"
                className="iconeTwitch"
              />
            </Link>
          </li>

          <li className="list-nav lparcourir">Parcourir</li>

          <li className={`list-nav ${theme ? "dark-btn" : "light-btn"}`}>
            <img src={PointList} alt="liste" className="pointList" />
          </li>

          <li className="list-nav form">
            <form className="formSubmit" onSubmit={handleSubmit}>
              <input
                value={searchInput}
                onChange={(e) => handleKeyPress(e)}
                type="text"
                className={`inputSearch ${
                  theme ? "input-dark" : "input-light"
                }`}
                placeholder="Rechercher"
              />
              <Link
                className="resultSearch"
                to={{
                  pathname: `/search/${searchInput}`,
                }}
              >
                <button
                  type="submit"
                  className={`${theme ? "glass-dark" : "glass-light"}`}
                >
                  <img
                    src={MagnifyingGlassSearch}
                    alt="Magnifying Glass Search"
                    className="magnifyingGlassSearch"
                  />
                </button>
              </Link>
            </form>
          </li>

          <li
            className={` list-nav search-mobile search-mobile ${
              theme ? "glass-dark" : "glass-light"
            }`}
          >
            <Link
              className="resultSearch-mobile"
              to={{
                pathname: `/search/term/${searchInput}`,
              }}
            >
              <img src={MagnifyingGlassSearch} alt="liste" />
            </Link>
          </li>

          <li className={`list-nav ${theme ? "dark-btn" : "light-btn"}`}>
            <img src={CadeauPrime} alt="Cadeau Prime" className="cadeauPrime" />
          </li>

          <li className={`list-nav ${theme ? "dark-btn" : "light-btn"}`}>
            Se connecter
          </li>

          <li className="list-nav">S'inscrire</li>

          <li
            className={`list-nav ${theme ? "dark-settings" : "light-settings"}`}
            onClick={toggleTheme}
          >
            <img src={Settings} alt="settings" className="settings" />
          </li>
        </ul>
      </nav>
    </div>
  );
}
