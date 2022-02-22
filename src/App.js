import "./App.css";
import Header from "./Components/Header/Header";
import SideBar from "./Components/SideBar/SideBar";
import Home from "./Components/Home/Home";
import ChannelLive from "./Components/ChannelLive/ChannelLive";
import { Routes, Route } from "react-router-dom";
import NotFound from "./Components/NotFound/NotFound";
import ResultSearch from "./Components/ResultSearch/ResultSearch";
import ThemeContextProvider from "./Components/Context/ThemeContext";
import ResultGame from "./Components/ResultGame/ResultGame";
import Search from "./Components/Search/Search";
import NotFoundUser from "./Components/NotFoundUser/NotFoundUser";

function App() {
  return (
    <div className="App">
      <ThemeContextProvider>
        <Header />
        <SideBar />
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Home />} />
          <Route path="/search/:slug" element={<ResultSearch />} />
          <Route path="/search/term/" element={<Search />} />
          <Route path="/search/" element={<NotFoundUser />} />
          <Route path="/:slug" element={<ChannelLive />} />
          <Route path="/directory/game/:slug" element={<ResultGame />} />
        </Routes>
      </ThemeContextProvider>
    </div>
  );
}

export default App;
