import { useEffect, useState } from "react";
import { HiOutlineMenu } from "react-icons/hi";
import { useNavigate, Link, useLocation } from "react-router-dom";
import Navigation from "../navigation/Navigation";
import { goToFirstPage } from "../../features/data/dataSlice";
import { useAppDispatch } from "../../app/hooks";

const Header = () => {
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const findGameByName = () => {
    dispatch(goToFirstPage());
    navigate(`/search/${inputValue}/page=1`);
  };

  useEffect(() => {
    setIsNavigationOpen(false);
  }, [location]);

  return (
    <section className="header">
      <nav className="header__nav">
        <div className="header__logo">
          <h1>
            <Link to="/">Game Finder</Link>
          </h1>
        </div>
        <div className="header__search">
          <form className="header__form" onSubmit={findGameByName}>
            <input
              className="header__input"
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Search games..."
            />
            <button className="header__btn">FIND</button>
          </form>
        </div>
        <HiOutlineMenu
          onClick={() => setIsNavigationOpen(!isNavigationOpen)}
          className="header__mobile-nav"
          size={30}
        />
        {isNavigationOpen && (
          <div className="header__display-list">
            <Navigation />
          </div>
        )}
      </nav>
    </section>
  );
};

export default Header;
