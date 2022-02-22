import React, { useState, useContext } from "react";
import "./Search.css";
import MagnifyingGlassSearch from "../Header/MagnifyingGlassSearch.svg";
import { ThemeContext } from "../Context/ThemeContext";
import { Link } from "react-router-dom";

export default function Search() {
  const [searchInput, setSearchInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleKeyPress = (e) => {
    setSearchInput(e.target.value);
  };

  const { theme } = useContext(ThemeContext);

  return (
    <div className="Search">
      <form className="formSubmit" onSubmit={handleSubmit}>
        <input
          required
          value={searchInput}
          onChange={(e) => handleKeyPress(e)}
          type="text"
          className={`input-m inputSearch ${
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
            className={` glass ${theme ? "glass-dark" : "glass-light"}`}
          >
            <img
              src={MagnifyingGlassSearch}
              alt="Magnifying Glass Search"
              className="magnifyingGlassSearch"
            />
          </button>
        </Link>
      </form>
    </div>
  );
}
