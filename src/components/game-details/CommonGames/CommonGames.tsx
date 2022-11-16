import React, { useEffect } from "react";
import { useAppSelector } from "../../../app/hooks";
import { selectData, API_KEY } from "../../../features/data/dataSlice";
import { GameSeries } from "../../../types";

interface PropsSeries {
  series: GameSeries[];
  setSeries: React.Dispatch<React.SetStateAction<GameSeries[]>>;
  apiValue: string;
  name: string;
}

const CommonGames = ({ series, setSeries, apiValue, name }: PropsSeries) => {
  const { singleGameDetails } = useAppSelector(selectData);

  useEffect(() => {
    fetch(
      `https://api.rawg.io/api/games/${singleGameDetails.slug}/${apiValue}?key=${API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
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
      });
  }, [singleGameDetails.slug]);

  if (series.length !== 0) {
    return (
      <>
        <h3 className="game-details__title">{name}</h3>
        <div className="game-details__series">
          {series &&
            series.map((game: GameSeries) => (
              <a
                key={game.name}
                href={`/game/${game.slug}`}
                className="game-details__serie-background"
                style={{
                  backgroundImage: `url(${game.background_image})`,
                }}
              >
                <p className="game-details__serie-name">{game.name}</p>
              </a>
            ))}
        </div>
      </>
    );
  } else return <></>;
};

export default CommonGames;
