import { useEffect } from "react";
import GamesWrapper from "../games-wrapper/GamesWrapper";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectData, fetchData } from "../../features/data/dataSlice";
import { useParams } from "react-router-dom";
import { useRedirectPage } from "../../customHooks/useRedirectPage";

const today = new Date();
const priorDate = new Date(new Date().setDate(today.getDate() - 30));
const day = today.getDate();
const month = today.getMonth() + 1;
const year = today.getFullYear();
const priorDate30 = priorDate.toISOString().slice(0, 10);

const currentDate = `${year}-${Number(month) < 10 ? `0${month}` : month}-${
  Number(day) < 10 ? `0${day}` : day
}`;

const GamesTrendings = () => {
  const { currentPage } = useAppSelector(selectData);
  const dispatch = useAppDispatch();
  const { page } = useParams();
  const redirect = useRedirectPage(page!);

  useEffect(() => {
    if (page) {
      redirect();
    }
  }, []);

  useEffect(() => {
    dispatch(
      fetchData({
        search_type: "games",
        ordering: "-metacritic",
        date: priorDate30 + "," + currentDate,
        platform: null,
        genre: null,
      })
    );
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <div className="games-trendings">
      <h1>Most popular in last 30 days by Metacritic</h1>
      <GamesWrapper />
    </div>
  );
};

export default GamesTrendings;
