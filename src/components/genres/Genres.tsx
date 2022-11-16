import { useEffect, useState, memo } from "react";
import { Link } from "react-router-dom";
import { API_KEY } from "../../features/data/dataSlice";

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
  const [genresHidden, setGenresHidden] = useState(true);
  useEffect(() => {
    fetch(`https://api.rawg.io/api/genres?key=${API_KEY}`)
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
        genres.map((genre: Genre, index) => (
          <li
            key={genre.id}
            className={
              index < 5 || !genresHidden
                ? classNameItem
                : `${classNameItem} ${classNameItem}--hide`
            }
          >
            <Link
              className={classNameLink}
              to={`games/page=1/genre=${genre.slug}/ordering=-popularity/date= /platform=PC`}
            >
              {genre.name}
            </Link>
          </li>
        ))}
      <li
        className="navigation__list-item-genre navigation__list-item-genre-display"
        onClick={() => setGenresHidden(!genresHidden)}
      >
        {genresHidden ? "SHOW ALL GENRES" : "HIDE"}
      </li>
    </>
  );
};

export default memo(Genres);
