import { useAppSelector } from "../../app/hooks";
import { selectData } from "../../features/data/dataSlice";
import PageButtons from "../../components/page-buttons/PageButtons";
import Loading from "../../components/loading/Loading";
import { useNavigate } from "react-router-dom";
import { useDisplayPlatformLogo } from "../../useDisplayPlatformLogo";

interface Genre {
  name: string;
}

interface PlatformName {
  name: string;
}

interface Platform {
  platform: PlatformName;
}

interface Game {
  id: number;
  background_image: string;
  parent_platforms: Platform[];
  metacritic: number;
  name: string;
  slug: string;
  genres: Genre[];
  released: string;
}

const GamesWrapper = () => {
  const navigate = useNavigate();
  const displayPlatformLogo = useDisplayPlatformLogo();
  const { data, loading } = useAppSelector(selectData);
  const isSearched = data && !loading && data.length !== 0 ? true : false;

  const selectGame = (title: string) => {
    navigate(`/game/${title}`);
  };

  const displayResults =
    isSearched &&
    data.results.map((game: Game) => (
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
                game.genres.map((genre: Genre) => (
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
    ));

  return (
    <>
      {isSearched ? (
        <>
          {" "}
          <section className="games-wrapper">{displayResults}</section>
          <PageButtons />
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default GamesWrapper;
