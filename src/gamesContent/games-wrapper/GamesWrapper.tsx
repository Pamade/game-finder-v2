import { useAppSelector } from "../../app/hooks";
import { selectData } from "../../features/data/dataSlice";
import { FaPlaystation, FaXbox } from "react-icons/fa";
import { IoDesktop } from "react-icons/io5";
import PageButtons from "../../components/page-buttons/PageButtons";
import { SiNintendo3Ds } from "react-icons/si";
import Loading from "../../components/loading/Loading";
interface Genre {
  name: string;
}

interface PlatformName {
  name: string;
}

interface Platfrom {
  platform: PlatformName;
}
const GamesWrapper = () => {
  const { data, loading } = useAppSelector(selectData);
  const isSearched = data && !loading && data.length !== 0;

  const displayGenres = (name: string) => {
    if (name === "PC") {
      return <IoDesktop key={name} className="games-wrapper__platform-icon" />;
    } else if (name.includes("Xbox One")) {
      return <FaXbox key={name} className="games-wrapper__platform-icon" />;
    } else if (name.includes("PlayStation 4")) {
      return (
        <FaPlaystation key={name} className="games-wrapper__platform-icon" />
      );
    } else if (name.includes("Nintendo 3")) {
      return (
        <SiNintendo3Ds key={name} className="games-wrapper__platform-icon" />
      );
    } else return "";
  };

  const displayResults =
    isSearched &&
    data.results.map((game: any) => (
      <div key={game.id} className="games-wrapper__single-game-box">
        <div
          style={{ backgroundImage: `url(${game.background_image}) ` }}
          className="games-wrapper__background-single"
        ></div>
        <div className="games-wrapper__info-single">
          <div className="games-wrapper__platform-rating">
            <div className="games-wrapper__platform">
              {game.platforms
                ? game.platforms.map((platform: Platfrom) =>
                    displayGenres(platform.platform.name)
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
              {game.genres.map((genre: Genre) => (
                <span className="games-wrapper__single-genre" key={genre.name}>
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
          <PageButtons />
          <section className="games-wrapper">{displayResults}</section>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default GamesWrapper;
