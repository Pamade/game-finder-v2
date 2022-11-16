import { Link } from "react-router-dom";

interface Props {
  details: any;
  nameValue: string;
}

const InfoBox = ({ details, nameValue }: Props) => {
  return (
    <div className="more-info__box">
      <p className="game-details__tag">{nameValue.toUpperCase()}</p>
      <div className="more-info__content">
        {details &&
          details.map((detail: { name: string; slug: string }) => (
            <span className="more-info__info-value" key={detail.name}>
              {nameValue === "genres" ? (
                <Link
                  className="more-info__link"
                  to={`/games/page=1/genre=${detail.slug}/ordering=-popularity/date=%20/platform=PC`}
                  replace={true}
                >
                  {detail.name}
                </Link>
              ) : (
                <Link
                  to={`/${nameValue}/${detail.name}`}
                  className="more-info__link"
                  replace={true}
                >
                  {detail.name}
                </Link>
              )}
            </span>
          ))}
      </div>
    </div>
  );
};

export default InfoBox;
