import { useEffect, useState } from "react";
import { GameNameSlug } from "../types";
export const useFetchTop5 = (type: string) => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetch(
      `https://api.rawg.io/api/${type}?key=${process.env.REACT_APP_API_KEY}`
    )
      .then((res) => res.json())
      .then((data) =>
        setResults(
          data.results.slice(0, 5).map((item: GameNameSlug) => {
            return { name: item.name, slug: item.slug };
          })
        )
      );
  }, []);
  return { results, type };
};

export default useFetchTop5;
