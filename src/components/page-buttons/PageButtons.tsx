import {
  goToFirstPage,
  goToNextPage,
  goToPreviousPage,
  setupPage,
  selectData,
} from "../../features/data/dataSlice";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { MAX_POSSIBLE_PAGE, RESULTS_SIZE } from "../../App";

const PageButtons = () => {
  const dispatch = useAppDispatch();
  const { currentPage, data } = useAppSelector(selectData);
  const resultsCountDvidedByGamePerSize = Math.ceil(data.count / RESULTS_SIZE);

  const maxPage =
    resultsCountDvidedByGamePerSize > MAX_POSSIBLE_PAGE
      ? MAX_POSSIBLE_PAGE
      : resultsCountDvidedByGamePerSize;

  const isNextPage = data.next && maxPage - 1 !== currentPage;
  const isFirstPage = currentPage > 3 && maxPage >= 3;
  const isCurrentPageEqualToMax = currentPage !== maxPage;

  return (
    <div className="page-buttons">
      {isFirstPage && (
        <button
          onClick={() => dispatch(goToFirstPage())}
          className="page-buttons__btn"
        >
          1
        </button>
      )}
      {data.previous && (
        <button
          onClick={() => dispatch(goToPreviousPage())}
          className="page-buttons__btn"
        >
          {currentPage - 1}
        </button>
      )}
      <button className="page-buttons__btn page-buttons__btn--active">
        {currentPage}
      </button>
      {isNextPage && isCurrentPageEqualToMax && (
        <button
          onClick={() => dispatch(goToNextPage())}
          className="page-buttons__btn"
        >
          {currentPage + 1}
        </button>
      )}
      {isCurrentPageEqualToMax && (
        <button
          onClick={() => dispatch(setupPage(maxPage))}
          className="page-buttons__btn"
        >
          {maxPage}
        </button>
      )}
    </div>
  );
};

export default PageButtons;
