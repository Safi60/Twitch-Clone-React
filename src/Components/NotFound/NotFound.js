import React from "react";
import "./NotFound.css";
import Ghost from "./ghost.svg";
import { Link } from "react-router-dom";

export default function Error() {
  return (
    <div className="NotFound">
      <div className="container-notFound">
        <img src={Ghost} alt="icone ghost" />
        <div className="container-txt-notfound">
          <h1 className="txt-notfound">
            Désolé. À moins que vous ayez une machine à voyager dans le temps,
            ce contenu n'est pas disponible.
          </h1>
          <Link className="notFound-link" to="/">
            <button className="btn-notfound">Parcourir les chaînes</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
