import { useEffect } from "react";
import GamesWrapper from "../games-wrapper/GamesWrapper";
import { GetDataProps } from "../../types";
import { useAppSelector } from "../../app/hooks";
import { selectData } from "../../features/data/dataSlice";

const today = new Date();
const priorDate = new Date(new Date().setDate(today.getDate() - 30));

const day = today.getDate();
const month = today.getMonth() + 1;
const year = today.getFullYear();
const priorDate30 = priorDate.toISOString().slice(0, 10);
export const currentDate = `${year}-${
  Number(month) < 10 ? `0${month}` : month
}-${Number(day) < 10 ? `0${day}` : day}`;

const GamesTrendings = ({ getData }: GetDataProps) => {
  const { currentPage } = useAppSelector(selectData);
  useEffect(() => {
    getData(
      "games",
      "-metacritic",
      priorDate30 + "," + currentDate,
      null,
      null
    );
  }, [currentPage]);

  return (
    <div className="games-trendings">
      <h1>Most popular in last 30 days by Metacritic</h1>
      <GamesWrapper />
    </div>
  );
};

export default GamesTrendings;
