import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectData, fetchGameDetails } from "../../features/data/dataSlice";
import { useParams } from "react-router-dom";
import CommonGames from "./CommonGames/CommonGames";
import { GameSeries } from "../.././types";
import GameDevelopers from "./Developers/GameDevelopers";
import GameAchievements from "./Achievements/GameAchievements";
import GameScreenshots from "./Screenshots/GameScreenshots";
import GameDescription from "./Description/GameDescription";
import GameMoreInfo from "./MoreInfo/GameMoreInfo";
import GameMainInfo from "./MainInfo/GameMainInfo";

const GameDetails = () => {
  const { singleGameDetailsLoading } = useAppSelector(selectData);
  const dispatch = useAppDispatch();
  const { gameName } = useParams();
  const [gameSeries, setGameSeries] = useState<GameSeries[]>([]);
  const [dlcs, setDlcs] = useState<GameSeries[]>([]);

  useEffect(() => {
    if (gameName && !singleGameDetailsLoading) {
      dispatch(fetchGameDetails(gameName));
    }
  }, []);

  if (singleGameDetailsLoading) return <p>Loading</p>;
  else
    return (
      <section className="game-details">
        <GameMainInfo />
        <div className="game-details__about">
          <h3 className="game-details__title">About</h3>
          <GameDescription />
          <GameScreenshots />
          <GameMoreInfo />
          <CommonGames
            apiValue="game-series"
            series={gameSeries}
            setSeries={setGameSeries}
            name="Games Series"
          />
          <CommonGames
            name="DLCs"
            apiValue="additions"
            series={dlcs}
            setSeries={setDlcs}
          />
          <GameAchievements />
          <GameDevelopers />
        </div>
      </section>
    );
};

export default GameDetails;
