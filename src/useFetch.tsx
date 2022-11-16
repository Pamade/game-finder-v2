import { useEffect, useState } from "react";

export const useFetch = (API: string, page: number) => {
  const [values, setValues] = useState([
    { name: "", background_image: "", slug: "" },
  ]);
  const [isFetched, setIsFetched] = useState(false);
  const [count, setCount] = useState(1);

  useEffect(() => {
    if (count > values.length || count === 1) {
      fetch(API)
        .then((res) => res.json())
        .then((data) => {
          if (data.next) {
            setIsFetched(true);
            setCount(data.count);
            data.results.map((game: any) => {
              setValues((prevGame) => [
                ...prevGame,
                {
                  name: game.name,
                  background_image: game.background_image,
                  slug: game.slug,
                },
              ]);
            });
          }
        });
      setIsFetched(false);
    }
  }, [page]);
  return { values, isFetched, count };
};
