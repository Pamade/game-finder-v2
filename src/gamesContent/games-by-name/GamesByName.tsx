/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  fetchByName,
  selectData,
  setupPage,
} from "../../features/data/dataSlice";
import { useNavigate } from "react-router-dom";
import GamesWrapper from "../games-wrapper/GamesWrapper";

const GamesByName = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { currentPage } = useAppSelector(selectData);
  const { gameName, page } = useParams();

  useEffect(() => {
    dispatch(setupPage(Number(page)));
  }, [page]);

  useEffect(() => {
    dispatch(fetchByName(gameName!));
    navigate(`/search/${gameName}/page=${currentPage}`, { replace: true });
  }, [currentPage, page]);

  return (
    <section className="games-content">
      <GamesWrapper />
    </section>
  );
};

export default GamesByName;
