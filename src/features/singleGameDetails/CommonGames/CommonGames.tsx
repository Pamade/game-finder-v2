import React, { useEffect } from "react";
import { useAppSelector } from "../../../app/hooks";
import { GameSeries } from "../../../types";
import { selectGameDetails } from "../singleGameDetailsSlice";
import { Link } from "react-router-dom";
interface PropsSeries {
  series: GameSeries[];
  setSeries: React.Dispatch<React.SetStateAction<GameSeries[]>>;
  apiValue: string;
  name: string;
}

const CommonGames = ({ series, setSeries, apiValue, name }: PropsSeries) => {
  const { singleGameDetails } = useAppSelector(selectGameDetails);

  useEffect(() => {
    fetch(
      `https://api.rawg.io/api/games/${singleGameDetails.slug}/${apiValue}?key=${process.env.REACT_APP_API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        setSeries([]);
        if (data.count > 0) {
          data.results.map((game: GameSeries) => {
            setSeries((prevGame) => [
              ...prevGame,
              {
                name: game.name,
                background_image: game.background_image,
                slug: game.slug,
              },
            ]);
          });
        }
      });
  }, [singleGameDetails.slug]);

  if (series.length !== 0) {
    return (
      <>
        <h3 className="game-details__title">{name}</h3>
        <div className="game-details__series">
          {series &&
            series.map((game: GameSeries) => (
              <Link
                key={game.name}
                to={`/game/${game.slug}`}
                className="game-details__serie-background"
                replace={true}
                style={{
                  backgroundImage: `url(${game.background_image})`,
                }}
              >
                <p className="game-details__serie-name">{game.name}</p>
              </Link>
            ))}
        </div>
      </>
    );
  } else return <></>;
};

export default CommonGames;
