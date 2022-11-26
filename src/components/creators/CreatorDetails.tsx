import React, { useEffect, useState } from "react";
import {
  goToNextPage,
  selectData,
  fetchCreatorGames,
} from "../../features/data/dataSlice";
import { useParams, useLocation, useNavigate, Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import GamesDisplay from "../games-wrapper/GamesDisplay";
import Spinner from "../spinner/Spinner";
import NotFound from "../not-found/NotFound";
import { RESULTS_SIZE } from "../../App";
import { Game } from "../../types";

const CreatorDetails = ({ type }: { type: string }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { data, currentPage, loadingFetchCreatorGames, loading } =
    useAppSelector(selectData);
  const { name, creatorSearch } = useParams();
  const [value, setValue] = useState(" ");
  const [gamesSearch, setGamesSearch] = useState<Game[] | null>(null);
  const [fetchingGames, setFetchingGames] = useState(false);

  const findCreatorGame = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`/${type}/${name}/search=${value}`);
    setValue("");
  };

  const dispatchCreators = () => {
    if (location.pathname.includes("search")) {
      dispatch(
        fetchCreatorGames({ name: name!, type, search: creatorSearch || value })
      );
    } else dispatch(fetchCreatorGames({ name: name!, type, search: null }));
  };

  useEffect(() => {
    setGamesSearch(null);
    if (currentPage === 1) {
      dispatchCreators();
    }
    const handleScroll = () => {
      const isUserOnBottomSite =
        window.innerHeight + window.scrollY >= document.body.scrollHeight;
      const currentCountBiggerThanAllResultsLength =
        Math.ceil(data.count / RESULTS_SIZE) !== currentPage &&
        !isNaN(data.count);

      if (
        currentCountBiggerThanAllResultsLength &&
        isUserOnBottomSite &&
        data.count > RESULTS_SIZE
      ) {
        dispatch(goToNextPage());
        dispatchCreators();
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [currentPage, location, data.count]);

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
    setFetchingGames(true);
    fetch(
      `https://api.rawg.io/api/games?key=${process.env.REACT_APP_API_KEY}&${type}=${name}&page_size=${RESULTS_SIZE}&page=1&search=${e.currentTarget.value}&search_precise&ordering=-popularity`
    )
      .then((res) => res.json())
      .then((data) => {
        setGamesSearch(data.results);
        setFetchingGames(false);
      });
  };

  if (loading)
    return (
      <div className="spinner-center">
        <Spinner />
      </div>
    );
  if (!data.count) return <NotFound />;
  return (
    <div className="creator-details">
      <h1 className="creator-details__heading">{name}</h1>
      <form onSubmit={findCreatorGame} className="creator-details__form">
        <input
          onChange={handleChangeValue}
          className="creator-details__input"
          value={value}
          type="text"
          placeholder={`Find ${name}'s game`}
        />
        <button className="creator-details__btn">Find</button>
      </form>
      {gamesSearch !== null &&
      gamesSearch.length !== 0 &&
      value !== "" &&
      value.length !== 1 ? (
        <div className="creator-details-results">
          {fetchingGames ? (
            <div
              style={{
                position: "relative",
                left: "50%",
                transform: "translateX(-50%)",
              }}
            >
              <Spinner />
            </div>
          ) : (
            gamesSearch.map((game: Game) => (
              <Link
                to={`/game/${game.slug}`}
                className="creator-details-results__result"
                key={game.name}
              >
                <div
                  className="creator-details-results__image"
                  style={{
                    backgroundImage: `url(${game.background_image})`,
                  }}
                ></div>
                <p className="creator-details-results__name">{game.name}</p>
              </Link>
            ))
          )}
        </div>
      ) : (
        ""
      )}
      <div className="games-wrapper">
        <GamesDisplay />
      </div>
      {loadingFetchCreatorGames && <Spinner />}
    </div>
  );
};

export default CreatorDetails;
