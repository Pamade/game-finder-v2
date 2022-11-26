import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Props {
  classNameItem: string;
  classNameLink: string;
}

interface Genre {
  id: number;
  slug: string;
  name: string;
}

const Genres = ({ classNameItem, classNameLink }: Props) => {
  const [genres, setGenres] = useState<Genre[]>([
    { id: 1, slug: "", name: "" },
  ]);

  useEffect(() => {
    fetch(`https://api.rawg.io/api/genres?key=${process.env.REACT_APP_API_KEY}`)
      .then((res) => res.json())
      .then((data) => {
        const vals = data.results.map((item: Genre) => {
          return { slug: item.slug, id: item.id, name: item.name };
        });
        setGenres(vals);
      });
  }, []);

  return (
    <>
      {genres &&
        genres.map((genre: Genre) => (
          <li key={genre.id} className={classNameItem}>
            <Link
              className={classNameLink}
              to={`/games/page=1/genre=${genre.slug}/ordering=-popularity/date= /platform=PC`}
            >
              {genre.name}
            </Link>
          </li>
        ))}
    </>
  );
};

export default Genres;
