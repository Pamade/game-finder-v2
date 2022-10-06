import { Link } from "react-router-dom";
import Genres from "../genres/Genres";
import { useAppDispatch } from "../../app/hooks";
import { goToFirstPage } from "../../features/data/dataSlice";

interface NavLink {
  name: string;
  path: string;
}

const navigationLinks = [
  { name: "Home", path: "/" },
  {
    name: "All Games",
    path: "/games/page=1/ordering=-added/date= /platform=4",
  },
];

const Navigation = () => {
  const dispatch = useAppDispatch();

  return (
    <ul className="navigation">
      {navigationLinks.map((item: NavLink) => (
        <li
          onClick={() => dispatch(goToFirstPage())}
          key={item.name}
          className="navigation__list-item"
        >
          <Link className="navigation__list-link" to={item.path}>
            {item.name}
          </Link>
        </li>
      ))}
      <h4>Genres</h4>
      <Genres
        classNameItem="navigation__list-item-genre"
        classNameLink="navigation__list-link"
      />
    </ul>
  );
};

export default Navigation;
