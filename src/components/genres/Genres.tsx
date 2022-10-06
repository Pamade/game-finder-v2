import { useEffect, useState, memo } from "react";
import { Link } from "react-router-dom";
import { API_KEY } from "../../features/data/dataSlice";

interface Props {
  classNameItem: string;
  classNameLink: string;
}

interface Genre {
  id: number;
  name: string;
}

const Genres = ({ classNameItem, classNameLink }: Props) => {
  const [genres, setGenres] = useState<any>([{ id: 1, name: "" }]);
  useEffect(() => {
    fetch(`https://api.rawg.io/api/genres?key=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => {
        const vals = data.results.map((item: Genre) => {
          return { name: item.name, id: item.id };
        });

        setGenres(vals);
      });
  }, []);

  return (
    <>
      {genres &&
        genres.map((genre: Genre) => (
          <li key={genre.id} className={classNameItem}>
            <Link className={classNameLink} to={`/genres/${genre.name}`}>
              {genre.name}
            </Link>
          </li>
        ))}
    </>
  );
};

export default memo(Genres);
