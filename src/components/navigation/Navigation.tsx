import Genres from "../genres/Genres";
import NavigationHeading from "./NavigationHeading";
import useFetchTop5 from "../../customHooks/useFetchTop5";
import { GameNameSlug } from "../../types";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { goToFirstPage } from "../../features/data/dataSlice";

const Navigation = () => {
  const dispatch = useAppDispatch();
  const { results: games } = useFetchTop5("games");
  const { results: publishers } = useFetchTop5("publishers");
  const { results: developers } = useFetchTop5("developers");

  const displayMostPopular = (results: GameNameSlug[], type: string) => {
    return (
      <>
        {results.map((result: GameNameSlug) => (
          <li
            onClick={() => dispatch(goToFirstPage())}
            className="navigation__list-item-popular"
            key={result.name}
          >
            <Link to={`/${type}/${result.slug}`}>{result.name}</Link>
          </li>
        ))}
      </>
    );
  };

  return (
    <ul className="navigation">
      <NavigationHeading name="Home" path="" className="home" />
      <NavigationHeading
        name="Publishers"
        path="/publishers/page=1"
        className="publishers"
      />
      {displayMostPopular(publishers, "publishers")}
      <NavigationHeading
        name="All Games"
        className="all-games"
        path="/games/page=1/ordering=-popularity/date= /platform=PC"
      />
      {displayMostPopular(games, "game")}
      <NavigationHeading
        name="Developers"
        className="developers"
        path="/developers/page=1"
      />
      {displayMostPopular(developers, "developers")}
      <li className="navigation__list-item navigation__list-item--genres navigation__list-item navigation__list-item--publishers">
        Genres
      </li>
      <Genres
        classNameItem="navigation__list-item-genre"
        classNameLink="navigation__list-link"
      />
    </ul>
  );
};

export default Navigation;
