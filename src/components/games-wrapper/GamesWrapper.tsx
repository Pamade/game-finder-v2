import { useContext } from "react";
import PageButtons from "../../components/page-buttons/PageButtons";
import Spinner from "../spinner/Spinner";
import GamesDisplay from "./GamesDisplay";
import { IsSearchedContext } from "../../App";
const GamesWrapper = () => {
  const isSearched = useContext(IsSearchedContext);

  return (
    <>
      {isSearched ? (
        <>
          <section className="games-wrapper">
            <GamesDisplay />
          </section>
          <PageButtons />
        </>
      ) : (
        <div className="spinner-center">
          <Spinner />
        </div>
      )}
    </>
  );
};

export default GamesWrapper;
