import { useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchByName, selectData } from "../../features/data/dataSlice";
import GamesWrapper from "../games-wrapper/GamesWrapper";
import Spinner from "../spinner/Spinner";
import { IsSearchedContext } from "../../App";
import { useRedirectPage } from "../../customHooks/useRedirectPage";
const GamesByName = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { currentPage } = useAppSelector(selectData);
  const { gameName, page } = useParams();
  const isSearched = useContext(IsSearchedContext);
  const redirect = useRedirectPage(page!);

  useEffect(() => {
    redirect();
  }, []);

  useEffect(() => {
    console.log(currentPage);
    dispatch(fetchByName(gameName!));
    navigate(`/search/${gameName}/page=${currentPage}`);
  }, [currentPage]);

  if (isSearched) {
    return (
      <section className="games-content">
        <GamesWrapper />
      </section>
    );
  } else
    return (
      <div className="spinner-center">
        <Spinner />
      </div>
    );
};

export default GamesByName;
