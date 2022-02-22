import React, { useState, useEffect } from "react";
import "./ResultSearch.css";
import { useParams } from "react-router-dom";
import api from "../../Api";
import { Link } from "react-router-dom";
import NotFoundUser from "../NotFoundUser/NotFoundUser";

export default function ResultSearch() {
  let { slug } = useParams();
  slug = slug.replace(/ /g, "");

  const [result, setResult] = useState(true);
  const [resultSearch, setResultSearch] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await api.get(
        `https://api.twitch.tv/helix/users?login=${slug}`
      );

      let dataArray = result.data.data;

      if (dataArray.length === 0) {
        setResult(false);
      } else {
        setResultSearch(dataArray[0]);
      }
    };
    fetchData();
  }, [slug]);

  return result ? (
    <div className="ResultSearch">
      <h2 className="channelResult">Chaînes</h2>
      <div className="container-result">
        <img
          className="resultimg"
          src={resultSearch.profile_image_url}
          alt=""
        />
        <div className="container-streamer">
          <h3 className="usernameResult">{resultSearch.display_name}</h3>
          <p className="viewResult">
            Nombre de vues : <span>{resultSearch.view_count}</span>
          </p>
          <div className="descriptionResult-container">
            <p className="descriptionResult">{resultSearch.description}</p>
          </div>
        </div>
        <div className="container-btnresult">
          <Link
            className="link-channel"
            to={{ pathname: `/${resultSearch.login}` }}
          >
            <button>REGARDER</button>
          </Link>
        </div>
      </div>
    </div>
  ) : (
    <NotFoundUser />
  );
}
