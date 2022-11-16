import { useEffect } from "react";
import { selectData, setupPage } from "../../features/data/dataSlice";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import PageButtons from "../page-buttons/PageButtons";
import { GetDataProps } from "../../types";

interface GameNameSlug {
  name: string;
  slug: string;
}

interface Publisher extends GameNameSlug {
  id: number;
  games: GameNameSlug[];
  games_count: number;
  image_background: string;
}

const Publishers = ({ getData }: GetDataProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { page } = useParams();
  const { currentPage, data, loading } = useAppSelector(selectData);
  const isSearched = data && !loading && data.length !== 0;

  useEffect(() => {
    dispatch(setupPage(Number(page)));
  }, [page]);

  useEffect(() => {
    getData("publishers", null, null, null, null);
    navigate(`/publishers/page=${currentPage}`);
  }, [currentPage]);

  if (isSearched) {
    return (
      <div className="publishers">
        <h1>Publishers</h1>
        <section className="publishers__wrapper">
          {data.results.map((publisher: Publisher) => {
            return (
              <div
                key={publisher.name}
                style={{
                  backgroundImage: `url(${publisher.image_background})`,
                }}
                className="publishers__wrapper-publisher"
              >
                <h3 className="publishers__wrapper-h3">
                  <Link
                    to={`/publishers/${publisher.slug}`}
                    replace={true}
                    className="publishers__wrapper-link"
                  >
                    {publisher.name}
                  </Link>
                </h3>
                <div className="publishers__wrapper-info">
                  <div className="publishers__wrapper-games">
                    <div className="publishers__wrapper-count-wrapper">
                      <p>GAMES COUNT</p>
                      <p>{publisher.games_count}</p>
                    </div>
                    <div className="publishers__wrapper-single-game-wrapper">
                      {publisher.games &&
                        publisher.games
                          .slice(0, 3)
                          .map((publisherGame: GameNameSlug) => {
                            return (
                              <ul key={publisherGame.name}>
                                <Link
                                  to={`./${publisherGame.slug}`}
                                  replace={true}
                                  className="publishers__wrapper-link-list"
                                >
                                  {publisherGame.name}
                                </Link>
                              </ul>
                            );
                          })}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </section>
        <PageButtons />
      </div>
    );
  } else return <></>;
};

export default Publishers;
