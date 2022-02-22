import React from "react";
import "./NotFoundUser.css";
import { Link } from "react-router-dom";
import user from "./user.svg";

export default function NotFoundUser() {
  return (
    <div className="NotFoundUser">
      <div className="container-notFoundUser">
        <img src={user} alt="icone user" />
        <div className="container-txt-notfoundUser">
          <h1 className="txt-notfoundUser">
            Désolé mais cet utilisateur n'existe pas. Veuillez vérifiez
            l'orthographe de votre saisie.
          </h1>
          <Link className="notFound-link" to="/">
            <button className="btn-notfoundUser">Parcourir les chaînes</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
