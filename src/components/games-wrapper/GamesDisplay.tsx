import { useContext } from "react";
import { useAppSelector } from "../../app/hooks";
import { selectData } from "../../features/data/dataSlice";
import { useNavigate } from "react-router-dom";
import { Platform, Game } from "../../types";
import { useDisplayPlatformLogo } from "../../customHooks/useDisplayPlatformLogo";
import Spinner from "../spinner/Spinner";
import { IsSearchedContext } from "../../App";

const GamesDisplay = () => {
  const displayPlatformLogo = useDisplayPlatformLogo();
  const navigate = useNavigate();
  const { data } = useAppSelector(selectData);
  const selectGame = (title: string) => {
    navigate(`/game/${title}`);
  };
  const isSearched = useContext(IsSearchedContext);

  if (isSearched) {
    return data.results.map((game: Game) => {
      return (
        <div
          onClick={() => selectGame(game.slug)}
          key={game.id}
          className="games-wrapper__single-game-box"
        >
          <div
            style={{
              backgroundImage: `url(${game.background_image}) `,
            }}
            className="games-wrapper__background-single"
          ></div>
          <div className="games-wrapper__info-single">
            <div className="games-wrapper__platform-rating">
              <div className="games-wrapper__platform">
                {game.parent_platforms
                  ? game.parent_platforms.map((platform: Platform) =>
                      displayPlatformLogo(platform.platform.name)
                    )
                  : ""}
              </div>
              <div className="games-wrapper__rating">
                <p>{game.metacritic || "?"}</p>
              </div>
            </div>
            <p>{game.name}</p>
          </div>
          <div className="games-wrapper__additional-info">
            <div className="games-wrapper__genre">
              <p className="games-wrapper__genre-p">
                Genres:{" "}
                {game.genres &&
                  game.genres.map((genre: { name: string }) => (
                    <span
                      className="games-wrapper__single-genre"
                      key={genre.name}
                    >
                      {genre.name} {""}
                    </span>
                  ))}
              </p>
            </div>
            <p className="games-wrapper__release-date">
              Release date: {game.released}
            </p>
          </div>
        </div>
      );
    });
  }
  return (
    <div className="spinner-center">
      <Spinner />
    </div>
  );
};

export default GamesDisplay;
