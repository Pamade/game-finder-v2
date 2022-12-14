import { useEffect, useState } from "react";
import { useAppSelector } from "../../../app/hooks";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import avatarPlaceholder from "../avatar placeholder.png";
import { GameNameSlug, Developer, FetchedDeveloper } from "../../../types";
import { selectGameDetails } from "../singleGameDetailsSlice";

const GameDevelopers = () => {
  const { singleGameDetails } = useAppSelector(selectGameDetails);
  const [developers, setDevelopers] = useState<Developer[]>([]);
  let [devPage, setDevPage] = useState(1);
  let [devIndex, setDevIndex] = useState(0);

  useEffect(() => {
    fetch(
      `https://api.rawg.io/api/games/${singleGameDetails.id}/development-team?key=${process.env.REACT_APP_API_KEY}&page=${devPage}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.count > 0) {
          setDevPage((devPage += 1));
          data.results.map((dev: FetchedDeveloper) => {
            const nameSlugArr: GameNameSlug[] = [{ name: "", slug: "" }];
            for (let i = 0; i < dev.games.length; i++) {
              nameSlugArr.push({
                name: dev.games[i].name,
                slug: dev.games[i].slug,
              });
            }
            setDevelopers((prev) => [
              ...prev,
              {
                id: dev.id,
                games_count: dev.games_count,
                slug: dev.slug,
                name: dev.name,
                image: dev.image,
                games: nameSlugArr,
                position: dev.positions[0].name,
              },
            ]);
          });
        }
      });
  }, [singleGameDetails.id, devPage]);

  const nextDev = () => {
    if (devIndex === developers.length - 1) {
      setDevIndex(0);
    } else setDevIndex((devIndex += 1));
  };

  const previousDev = () => {
    if (devIndex === 0) {
      setDevIndex(developers.length - 1);
    } else setDevIndex((devIndex -= 1));
  };

  const displayDev = (dev: Developer) => {
    return (
      <div className="developers__single-box">
        <p className="developers__name">{dev.name}</p>
        <img
          src={dev.image ? dev.image : avatarPlaceholder}
          alt={dev.name}
          className="developers__image"
        />
        <p className="developers__position">{dev.position}</p>
        <ul className="developers__list">
          {dev.games.map((game: GameNameSlug) => (
            <li className="developers__list-item" key={game.name}>
              <a href={`/game/${game.slug}`}>{game.name}</a>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  if (developers.length !== 0) {
    const devLeft =
      devIndex === 0
        ? developers[developers.length - 1]
        : developers[devIndex - 1];
    const devMid = developers[devIndex];
    const devRight =
      devIndex === developers.length - 1
        ? developers[0]
        : developers[devIndex + 1];

    return (
      <div className="developers">
        <div className="developers__carousel">
          <AiOutlineArrowLeft
            className="developers__carousel-arrow developers__carousel-arrow-left"
            onClick={previousDev}
            size={35}
          />
          <div className="developers__carousel-left developers__carousel-side">
            {displayDev(devLeft)}
          </div>
          <div className="developers__carousel-mid">{displayDev(devMid)}</div>
          <div className="developers__carousel-right developers__carousel-side">
            {displayDev(devRight)}
          </div>
          <AiOutlineArrowRight
            className="developers__carousel-arrow developers__carousel-arrow-left"
            onClick={nextDev}
            size={35}
          />
        </div>
      </div>
    );
  } else return <></>;
};

export default GameDevelopers;
