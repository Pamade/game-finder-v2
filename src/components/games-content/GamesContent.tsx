import React, { useState, useEffect, useRef } from "react";
import GamesWrapper from "../games-wrapper/GamesWrapper";
import Genres from "../genres/Genres";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  selectData,
  goToFirstPage,
  fetchData,
} from "../../features/data/dataSlice";
import { useParams, useNavigate } from "react-router-dom";
import { useRedirectPage } from "../../customHooks/useRedirectPage";

interface Platform {
  id: number;
  name: string;
  games_count: number;
}

const max = new Date().getFullYear();
const min = max - 30;
let years: string[] = [];

for (let i = max; i >= min; i--) {
  years.push(String(i));
}

years = years.map(
  (item: string, index: number) =>
    `${years[index + 1]}-12-31,${String(item)}-12-31`
);

const orderByOrdering = ["popularity", "released", "metacritic", "name"];
const orderByDate = years.slice(0, -1);

const GamesContent = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { currentPage } = useAppSelector(selectData);
  const { page, dateLink, platformLink, orderingLink, genre } = useParams();
  const redirect = useRedirectPage(page!);
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [findPlatId, setFindPlatId] = useState<string | number | undefined>(
    "4"
  );
  const platfromValue = useRef<HTMLSelectElement>(null);

  const [filters, setFilters] = useState({
    ordering: orderingLink,
    date: dateLink,
    platform: { id: findPlatId, name: platformLink },
  });

  useEffect(() => {
    fetch(
      `https://api.rawg.io/api/platforms?key=${process.env.REACT_APP_API_KEY}`
    )
      .then((res) => res.json())
      .then((data) =>
        setPlatforms(
          data.results.filter(
            (item: Platform) => item.games_count > 1000 && item
          )
        )
      );
  }, []);

  useEffect(() => {
    if (platforms && platforms.length !== 0) {
      const foundItem = platforms.find(
        (item: Platform) => item.name === platformLink
      );
      setFindPlatId(foundItem?.id);
    }
  }, [platforms]);

  useEffect(() => {
    redirect();
  }, []);

  useEffect(() => {
    const navigateToLink = `/games/page=${currentPage}/${
      genre ? `genre=${genre}/` : ""
    }ordering=${
      filters.ordering === "-added" ? "-popularity" : filters.ordering
    }/date=${filters.date ? filters.date : " "}/platform=${
      filters.platform.name
    }`;
    navigate(navigateToLink, { replace: true });

    dispatch(
      fetchData({
        search_type: "games",
        ordering: filters.ordering!,
        date: filters.date!,
        platform: String(findPlatId),
        genre: genre || null,
      })
    );
  }, [filters, currentPage, genre, location, findPlatId]);

  const searchWithPlatfrom = () => {
    dispatch(goToFirstPage());
    if (platfromValue.current) {
      const platformId = platfromValue.current?.selectedOptions[0].id;
      setFilters({
        ...filters,
        platform: {
          id: platformId,
          name: platfromValue.current?.selectedOptions[0].value,
        },
      });
      setFindPlatId(platformId);
    }
  };

  const searchWithFilters = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(goToFirstPage());
    setFilters({
      ...filters,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const displayOrderValues = orderByOrdering.map((value) => {
    return (
      <option
        key={value}
        className="games-content__select-option"
        value={"-" + value}
      >
        {value === "added"
          ? "Popularity"
          : value.charAt(0).toUpperCase() + value.slice(1)}
      </option>
    );
  });

  const displayOrderDate = orderByDate.map((value: string) => (
    <option key={value} className="games-content__select-option" value={value}>
      {Number(value.slice(0, 4)) + 1}
    </option>
  ));

  const displayOrderPlatform = platforms?.map((platform: Platform) => (
    <option
      key={platform.name}
      className="games-content__select-option"
      id={String(platform.id)}
      value={platform.name}
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
          className="games-content__select"
          value={orderingLink}
        >
          {displayOrderValues}
        </select>
        <select
          onChange={(e) => searchWithFilters(e)}
          className="games-content__select"
          name="date"
          value={dateLink}
        >
          <option className="games-content__select-option" value={""}>
            All time
          </option>
          {displayOrderDate}
        </select>
        <select
          ref={platfromValue}
          onChange={searchWithPlatfrom}
          name="platform"
          value={platformLink}
          className="games-content__select"
        >
          {platforms.length !== 0 ? displayOrderPlatform : <option>PC</option>}
        </select>
      </div>
      <GamesWrapper />
    </section>
  );
};

export default GamesContent;
