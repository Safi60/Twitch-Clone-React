import React from "react";
import TopStream from "../TopStream/TopStream";
import Game from "../Game/Game";
import Category from "../Category/Category";
import JustChatting from "../JustChatting/JustChatting";
import Fortnite from "../Fortnite/Fortnite";
import LeagueOfLegends from "../LeagueOfLegends/LeagueOfLegends";
import './Home.css'

export default function Home() {
  return (
    <div className="Home">
      <TopStream />
      <Game />
      <Category />
      <JustChatting />
      <Fortnite />
      <LeagueOfLegends />
    </div>
  );
}
