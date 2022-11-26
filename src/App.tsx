import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { selectData } from "./features/data/dataSlice";
import { useAppSelector } from "./app/hooks";
import Header from "./components/header/Header";
import AsideNavigation from "./components/aside-navigation/AsideNavigation";
import GamesTrendings from "./components/games-trendings/GamesTrendings";
import GamesContent from "./components/games-content/GamesContent";
import GamesByName from "./components/games-by-name/GamesByName";
import GameDetails from "./features/singleGameDetails/GameDetails";
import Creators from "./components/creators/Creators";
import CreatorDetails from "./components/creators/CreatorDetails";
import NotFound from "./components/not-found/NotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles/main.scss";

export const MAX_POSSIBLE_PAGE = 500;
export const RESULTS_SIZE = 10;
export const IsSearchedContext = React.createContext(false);

const App = () => {
  const location = useLocation();
  const { data, loading } = useAppSelector(selectData);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const isSearched = data.results && !loading;

  return (
    <IsSearchedContext.Provider value={isSearched}>
      <div className="App">
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        <Header />
        <main className="content-wrapper">
          <AsideNavigation />
          {/* if api will not find results, then returns object with detail key */}
          {data.detail ? (
            <NotFound />
          ) : (
            <Routes>
              <Route path="/" element={<GamesTrendings />} />
              <Route
                path="/trendings/page=:page"
                element={<GamesTrendings />}
              />
              <Route
                path="/publishers/page=:page"
                element={<Creators type="publishers" />}
              />
              <Route
                path="/developers/page=:page"
                element={<Creators type="developers" />}
              />
              <Route
                path="/publishers/:name"
                element={<CreatorDetails type="publishers" />}
              />
              <Route
                path="/developers/:name"
                element={<CreatorDetails type="developers" />}
              />
              <Route
                path="/developers/:name/search=:creatorSearch"
                element={<CreatorDetails type="developers" />}
              />
              <Route
                path="/publishers/:name/search=:creatorSearch"
                element={<CreatorDetails type="publishers" />}
              />
              <Route
                path="/games/page=:page/ordering=:orderingLink/date=:dateLink/platform=:platformLink"
                element={<GamesContent />}
              />
              <Route
                path="/games/page=:page/genre=:genre/ordering=:orderingLink/date=:dateLink/platform=:platformLink"
                element={<GamesContent />}
              />
              <Route
                path="/search/:gameName/page=:page"
                element={<GamesByName />}
              />
              <Route path="/game/:gameName" element={<GameDetails />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          )}
        </main>
      </div>
    </IsSearchedContext.Provider>
  );
};

export default App;
