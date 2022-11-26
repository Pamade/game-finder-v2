import { Link } from "react-router-dom";
import { GameNameSlug } from "../../../types";
import { goToFirstPage } from "../../data/dataSlice";
import { useAppDispatch } from "../../../app/hooks";
interface Props {
  details: GameNameSlug[];
  nameValue: string;
}

const InfoBox = ({ details, nameValue }: Props) => {
  const dispatch = useAppDispatch();
  return (
    <div className="more-info__box">
      <p className="game-details__tag">{nameValue.toUpperCase()}</p>
      <ul className="more-info__content">
        {details &&
          details.map((detail: GameNameSlug) => (
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
                <li onClick={() => dispatch(goToFirstPage())}>
                  <Link
                    to={`/${nameValue}/${detail.slug}`}
                    className="more-info__link"
                    replace={true}
                  >
                    {detail.name}
                  </Link>
                </li>
              )}
            </span>
          ))}
      </ul>
    </div>
  );
};

export default InfoBox;
