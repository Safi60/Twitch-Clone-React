import React from "react";
import "./Category.css";
import gaming from "./icon/gaming.svg";
import irl from "./icon/irl.svg";
import music from "./icon/music.svg";
import esports from "./icon/esports.svg";
import creative from "./icon/creative.svg";

export default function Category() {
  return (
    <div className="Category">
      <div className="category-container">
        <div className="item-category">
          <a href="">
            <div className="elementCategory">
              <div className="titleElement">
                <p>Jeux</p>
              </div>
              <div className="imgElement">
                <img src={gaming} alt="" />
              </div>
            </div>
          </a>
        </div>
        <div className="item-category">
          <a href="">
            <div className="elementCategory">
              <div className="titleElement">
                <p>IRL</p>
              </div>
              <div className="imgElement">
                <img src={irl} alt="" />
              </div>
            </div>
          </a>
        </div>
        <div className="item-category">
          <a href="">
            <div className="elementCategory">
              <div className="titleElement">
                <p>Musique</p>
              </div>
              <div className="imgElement">
                <img src={music} alt="" />
              </div>
            </div>
          </a>
        </div>
        <div className="item-category">
          <a href="">
            <div className="elementCategory">
              <div className="titleElement">
                <p>Esports</p>
              </div>
              <div className="imgElement">
                <img src={esports} alt="" />
              </div>
            </div>
          </a>
        </div>
        <div className="item-category">
          <a href="">
            <div className="elementCategory">
              <div className="titleElement">
                <p>Créatif</p>
              </div>
              <div className="imgElement">
                <img src={creative} alt="" />
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
