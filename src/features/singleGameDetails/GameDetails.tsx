import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  selectGameDetails,
  fetchSingleGameDetails,
} from "../../features/singleGameDetails/singleGameDetailsSlice";
import { useParams } from "react-router-dom";
import CommonGames from "./CommonGames/CommonGames";
import { GameSeries } from "../.././types";
import GameDevelopers from "./Developers/GameDevelopers";
import GameAchievements from "./Achievements/GameAchievements";
import GameScreenshots from "./Screenshots/GameScreenshots";
import GameDescription from "./Description/GameDescription";
import GameMoreInfo from "./MoreInfo/GameMoreInfo";
import GameMainInfo from "./MainInfo/GameMainInfo";
import Spinner from "../../components/spinner/Spinner";
import NotFound from "../../components/not-found/NotFound";
const GameDetails = () => {
  const dispatch = useAppDispatch();
  const { singleGameDetailsLoading, singleGameDetails } =
    useAppSelector(selectGameDetails);
  const { gameName } = useParams();
  const [gameSeries, setGameSeries] = useState<GameSeries[]>([]);
  const [dlcs, setDlcs] = useState<GameSeries[]>([]);

  useEffect(() => {
    setGameSeries([]);
    if (gameName && !singleGameDetailsLoading) {
      dispatch(fetchSingleGameDetails(gameName));
    }
  }, [gameName]);

  if (singleGameDetailsLoading)
    return (
      <div className="spinner-center">
        <Spinner />
      </div>
    );
  if (singleGameDetails.detail === "Not found.") return <NotFound />;

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
