import { useAppDispatch } from "../../app/hooks";
import { goToFirstPage } from "../../features/data/dataSlice";
import { Link } from "react-router-dom";

interface NavLink {
  name: string;
  path: string;
  className: string;
}

const NavigationHeading = ({ name, path, className }: NavLink) => {
  const dispatch = useAppDispatch();
  return (
    <li
      onClick={() => dispatch(goToFirstPage())}
      className={`navigation__list-item navigation__list-item--${className}`}
    >
      <Link className="navigation__list-link" to={path}>
        {name}
      </Link>
    </li>
  );
};

export default NavigationHeading;
