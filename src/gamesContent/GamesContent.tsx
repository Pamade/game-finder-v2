/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import GamesWrapper from "./games-wrapper/GamesWrapper";
import Genres from "../components/genres/Genres";
import { GetDataProps } from "../types";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import {
  selectData,
  goToFirstPage,
  setupPage,
} from "../features/data/dataSlice";
import { API_KEY } from "../features/data/dataSlice";
import { useParams, useNavigate } from "react-router-dom";

interface Platform {
  id: number;
  name: string;
  games_count: number;
}

const orderByOrdering = ["added", "name", "released", "metacritic"];
const orderByDate = ["2019-01-01,2019-12-31", "2020-01-01,2020-12-31"];

const GamesContent = ({ getData, type }: GetDataProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { currentPage } = useAppSelector(selectData);
  const { page, dateLink, platformLink, orderingLink } = useParams();
  const [filters, setFilters] = useState({
    ordering: orderingLink || "-added",
    date: dateLink || " ",
    platform: platformLink || "4",
  });

  const [platforms, setPlatforms] = useState<Platform[]>([
    { id: 4, name: "PC", games_count: 0 },
  ]);

  useEffect(() => {
    dispatch(setupPage(Number(page)));
  }, [page]);

  useEffect(() => {
    navigate(
      `/games/page=${currentPage}/ordering=${filters.ordering}/date=${
        filters.date ? filters.date : " "
      }/platform=${filters.platform}`,
      { replace: true }
    );
    getData("games", filters.ordering, filters.date, filters.platform);
    console.log(filters);
  }, [filters, currentPage]);

  useEffect(() => {
    if (type !== "search") {
      getData("games", filters.ordering, filters.date, filters.platform);
    }
  }, [filters, currentPage]);

  useEffect(() => {
    fetch(`https://api.rawg.io/api/platforms?key=${API_KEY}`)
      .then((res) => res.json())
      .then((data) =>
        setPlatforms(
          data.results.filter(
            (item: Platform) => item.games_count > 1000 && item
          )
        )
      );
  }, []);

  const searchWithFilters = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(goToFirstPage());
    e.currentTarget.name === "ordering"
      ? setFilters({
          ...filters,
          [e.currentTarget.name]: "-" + e.currentTarget.value,
        })
      : setFilters({
          ...filters,
          [e.currentTarget.name]: e.currentTarget.value,
        });
    console.log(filters);
  };

  const displayOrderValues = orderByOrdering.map((value) => {
    return (
      <option
        key={value}
        className="games-content__select-option"
        value={value}
      >
        {value.charAt(0).toUpperCase() + value.slice(1)}
      </option>
    );
  });

  const displayOrderDate = orderByDate.map((item) => (
    <option key={item} className="games-content__select-option" value={item}>
      {item}
    </option>
  ));

  const displayOrderPlatform = platforms.map((platform: Platform) => (
    <option
      key={platform.name}
      className="games-content__select-option"
      value={platform.id}
    >
      {platform.name}
    </option>
  ));

  return (
    <section className="games-content">
      <ul className="games-content__list">
        <Genres
          classNameItem="games-content__list-item-genres"
          classNameLink="games-content__list-link"
        />
      </ul>
      <div className="games-content__filters">
        <select
          name="ordering"
          onChange={(e) => searchWithFilters(e)}
          defaultValue={filters.ordering}
          className="games-content__select"
        >
          {displayOrderValues}
        </select>
        <select
          onChange={(e) => searchWithFilters(e)}
          className="games-content__select"
          defaultValue={filters.date}
          name="date"
        >
          <option className="games-content__select-option" value={""}>
            All time
          </option>
          {displayOrderDate}
        </select>
        <select
          name="platform"
          onChange={(e) => searchWithFilters(e)}
          defaultValue={filters.platform}
          className="games-content__select"
        >
          {displayOrderPlatform}
        </select>
      </div>
      <GamesWrapper />
    </section>
  );
};

export default GamesContent;
