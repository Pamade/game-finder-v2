import { useAppSelector } from "../../../app/hooks";
import { selectData } from "../../../features/data/dataSlice";
import InfoBox from "./InfoBox";
import { Platform } from "../../../types";

const GameMoreInfo = () => {
  const { singleGameDetails } = useAppSelector(selectData);
  return (
    <div className="more-info">
      <div className="more-info__box">
        <p className="game-details__tag">PLATFORMS</p>
        <div className="more-info__content">
          {singleGameDetails.platforms &&
            singleGameDetails.platforms.map((platform: Platform) => (
              <span
                className="more-info__info-value"
                key={platform.platform.name}
              >
                {platform.platform.name}{" "}
              </span>
            ))}
        </div>
      </div>
      <div className="more-info__box">
        <p className="game-details__tag">AGE RATING</p>
        <div className="more-info__content">
          {(singleGameDetails.esrb_rating && (
            <span className="more-info__info-value">
              {singleGameDetails.esrb_rating.name}
            </span>
          )) || <p>No data</p>}
        </div>
      </div>
      <div className="more-info__box">
        <p className="game-details__tag">WEBSITE</p>
        <div className="more-info__content">
          {(singleGameDetails.website && (
            <span className="more-info__info-value">
              {
                <a
                  target="_blank"
                  className="game-details__info-link"
                  href={singleGameDetails.website}
                  rel="noreferrer"
                >
                  {singleGameDetails.website}
                </a>
              }
            </span>
          )) || <p>No data</p>}
        </div>
      </div>
      {singleGameDetails.genres && singleGameDetails.genres.length !== 0 ? (
        <InfoBox nameValue="genres" details={singleGameDetails.genres} />
      ) : (
        <div className="more-info__box">
          <p className="game-details__tag">Genres</p>
          <p>No data</p>
        </div>
      )}
      {singleGameDetails.developers && (
        <InfoBox
          nameValue="developers"
          details={singleGameDetails.developers}
        />
      )}
      {singleGameDetails.publishers && (
        <InfoBox
          nameValue="publishers"
          details={singleGameDetails.publishers}
        />
      )}
    </div>
  );
};

export default GameMoreInfo;
