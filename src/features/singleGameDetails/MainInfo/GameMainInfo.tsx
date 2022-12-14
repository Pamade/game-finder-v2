import { useAppSelector } from "../../../app/hooks";
import PieChart from "./PieChart";
import { useDisplayPlatformLogo } from "../../../customHooks/useDisplayPlatformLogo";
import { Platform } from "../../../types";
import { selectGameDetails } from "../singleGameDetailsSlice";

const GameMainInfo = () => {
  const { singleGameDetails } = useAppSelector(selectGameDetails);
  const displayGenres = useDisplayPlatformLogo();
  return (
    <div className="main-info">
      <div
        className="main-info__background"
        style={{
          backgroundImage: `url("${
            singleGameDetails ? singleGameDetails.background_image : null
          }")`,
        }}
      ></div>
      <p className="main-info__released">
        Released {singleGameDetails.released}
      </p>
      <h3 className="main-info__header">
        {singleGameDetails && singleGameDetails.name}
      </h3>
      <div className="main-info__platforms">
        {singleGameDetails.parent_platforms &&
          singleGameDetails.parent_platforms.map((platform: Platform) =>
            displayGenres(platform.platform.name)
          )}
      </div>
      <PieChart />
    </div>
  );
};

export default GameMainInfo;
