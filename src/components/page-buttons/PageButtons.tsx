import React from "react";
import {
  goToFirstPage,
  goToNextPage,
  goToPreviousPage,
} from "../../features/data/dataSlice";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectData } from "../../features/data/dataSlice";

const PageButtons = () => {
  const dispatch = useAppDispatch();
  const { currentPage, data } = useAppSelector(selectData);
  return (
    <div className="page-buttons">
      {currentPage !== 1 && (
        <button
          onClick={() => dispatch(goToPreviousPage())}
          className="page-buttons__btn"
        >
          -1
        </button>
      )}
      <button
        onClick={() => dispatch(goToFirstPage())}
        className="page-buttons__btn"
      >
        1
      </button>
      {data.next && (
        <button
          onClick={() => dispatch(goToNextPage())}
          className="page-buttons__btn"
        >
          +1
        </button>
      )}
    </div>
  );
};

export default PageButtons;
