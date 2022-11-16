import {
  goToFirstPage,
  goToNextPage,
  goToPreviousPage,
  setupPage,
} from "../../features/data/dataSlice";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectData } from "../../features/data/dataSlice";

const PageButtons = () => {
  const dispatch = useAppDispatch();
  const { currentPage, data } = useAppSelector(selectData);
  const maxPages = 500;
  const allPagesCount =
    Math.ceil(data.count / 20) < maxPages
      ? Math.ceil(data.count / 20)
      : maxPages;
  const hideButton =
    currentPage + 1 === allPagesCount || currentPage === allPagesCount;

  return (
    <div className="page-buttons">
      {data.previous && (
        <button
          onClick={() => dispatch(goToPreviousPage())}
          className="page-buttons__btn"
        >
          {currentPage - 1}
        </button>
      )}
      <button
        onClick={() => dispatch(goToFirstPage())}
        className="page-buttons__btn page-buttons__btn--active"
      >
        {currentPage}
      </button>
      {currentPage === allPagesCount ? (
        ""
      ) : (
        <button
          onClick={() => dispatch(goToNextPage())}
          className="page-buttons__btn"
        >
          {currentPage + 1}
        </button>
      )}

      {hideButton ? "" : <span style={{ alignSelf: "flex-end" }}>...</span>}
      {hideButton ? (
        ""
      ) : (
        <button
          onClick={() => dispatch(setupPage(allPagesCount))}
          className="page-buttons__btn"
        >
          {allPagesCount}
        </button>
      )}
    </div>
  );
};

export default PageButtons;
