import { useEffect } from "react";
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

const App = () => {
  const dispatch = useAppDispatch();
  const getData = (
    search_type: string,
    ordering: StringOrNull,
    date: StringOrNull,
    platform: StringOrNull
  ) => {
    dispatch(fetchData({ search_type, ordering, date, platform }));
  };
  useEffect(() => {
    // dispatch(fetchGenres());
    // TUTAJ BĘDZIE GŁÓWNA STRONA I FECZNIE NAJPOPULARNIEJSZE,
    // AKUTLANIE FECZUJE Z WSZYSTYKIE GRY
  }, []);

  return (
    <div className="App">
      <Header />

      <main className="content-wrapper">
        <AsideNavigation />
        <Routes>
          <Route path="" element={<GamesTrendings getData={getData} />} />
          <Route
            path="/trendings"
            element={<GamesTrendings getData={getData} />}
          />
          <Route
            path="/games/page=:page/ordering=:orderingLink/date=:dateLink/platform=:platformLink"
            element={<GamesContent getData={getData} />}
          />
          <Route
            path="/search/:gameName/page=:page"
            element={<GamesByName />}
          />
        </Routes>
      </main>
    </div>
  );
};

export default App;
