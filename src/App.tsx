import { useAppDispatch } from "./app/hooks";
import { Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import AsideNavigation from "./components/aside-navigation/AsideNavigation";
import GamesContent from "./gamesContent/GamesContent";
import "./styles/main.scss";
import { fetchData } from "./features/data/dataSlice";
import { StringOrNull } from "./types";
import GamesTrendings from "./gamesContent/games-trendings/GamesTrendings";
import GamesByName from "./gamesContent/games-by-name/GamesByName";
import GameDetails from "./components/game-details/GameDetails";
import Publishers from "./components/publishers/Publishers";
import PublisherDetails from "./components/publishers/PublisherDetails";

const App = () => {
  const dispatch = useAppDispatch();
  const getData = (
    search_type: string,
    ordering: StringOrNull,
    date: StringOrNull,
    platform: StringOrNull,
    genre: StringOrNull
  ) => {
    dispatch(fetchData({ search_type, ordering, date, platform, genre }));
  };

  return (
    <div className="App">
      <Header />
      <main className="content-wrapper">
        <AsideNavigation />
        <Routes>
          <Route path="/" element={<GamesTrendings getData={getData} />} />
          <Route
            path="/trendings"
            element={<GamesTrendings getData={getData} />}
          />
          <Route
            path="/publishers/page=:page"
            element={<Publishers getData={getData} />}
          />
          <Route path="/publishers/:name" element={<PublisherDetails />} />
          <Route
            path="/games/page=:page/ordering=:orderingLink/date=:dateLink/platform=:platformLink"
            element={<GamesContent getData={getData} />}
          />
          <Route
            path="/games/page=:page/genre=:genre/ordering=:orderingLink/date=:dateLink/platform=:platformLink"
            element={<GamesContent getData={getData} />}
          />
          <Route
            path="/search/:gameName/page=:page"
            element={<GamesByName />}
          />
          <Route path="/game/:gameName" element={<GameDetails />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
