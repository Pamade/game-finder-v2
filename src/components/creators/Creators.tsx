import { useEffect, useContext } from "react";
import {
  selectData,
  goToFirstPage,
  fetchData,
} from "../../features/data/dataSlice";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Creator, GameNameSlug } from "../../types";
import PageButtons from "../page-buttons/PageButtons";
import Spinner from "../spinner/Spinner";
import { IsSearchedContext } from "../../App";
import { useRedirectPage } from "../../customHooks/useRedirectPage";

const Creators = ({ type }: { type: string }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { currentPage, data } = useAppSelector(selectData);
  const { page } = useParams();
  const redirect = useRedirectPage(page!);
  const isSearched = useContext(IsSearchedContext);

  useEffect(() => {
    redirect();
  }, []);

  useEffect(() => {
    dispatch(
      fetchData({
        search_type: type,
        ordering: null,
        date: null,
        platform: null,
        genre: null,
      })
    );
    navigate(`/${type}/page=${currentPage}`);
  }, [currentPage, type]);

  if (isSearched) {
    return (
      <div className="creators">
        <h1 className="creators__heading">{type}</h1>
        <section className="creators__wrapper">
          {data.results.map((creator: Creator) => {
            return (
              <div
                key={creator.name}
                style={{
                  backgroundImage: `url(${creator.image_background})`,
                }}
                className="creators__wrapper-creator"
              >
                <h3 className="creators__wrapper-h3">
                  <Link
                    onClick={() => dispatch(goToFirstPage())}
                    to={`/${type}/${creator.slug}`}
                    replace={true}
                    className="creators__wrapper-link"
                  >
                    {creator.name}
                  </Link>
                </h3>
                <div className="creators__wrapper-info">
                  <div className="creators__wrapper-games">
                    <div className="creators__wrapper-count-wrapper">
                      <p>GAMES COUNT</p>
                      <p>{creator.games_count}</p>
                    </div>
                    <div className="creators__wrapper-single-game-wrapper">
                      {creator.games &&
                        creator.games
                          .slice(0, 3)
                          .map((creatorGame: GameNameSlug) => {
                            return (
                              <ul key={creatorGame.name}>
                                <Link
                                  to={`/game/${creatorGame.slug}`}
                                  replace={true}
                                  className="creators__wrapper-link-list"
                                >
                                  {creatorGame.name}
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
  }
  return (
    <div className="spinner-center">
      <Spinner />
    </div>
  );
};

export default Creators;
