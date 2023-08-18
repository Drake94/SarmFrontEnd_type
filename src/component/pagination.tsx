/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { Button } from "react-bulma-components";

interface PaginationProps {
  samplesForPage: number;
  totalSamples: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination: React.FC<PaginationProps> = ({
  samplesForPage,
  totalSamples,
  currentPage,
  setCurrentPage,
}) => {
  const pageNumbers: number[] = [];
  const [pageNumbersLimit, setPageNumbersLimit] = useState(5);
  const [maxPageNumbersLimit, setMaxPageNumbersLimit] = useState(5);
  const [minPageNumbersLimit, setMinPageNumbersLimit] = useState(0);

  const onPreviousPage = () => {
    setCurrentPage(currentPage - 1);
    if ((currentPage - 1) % pageNumbersLimit === 0) {
      setMaxPageNumbersLimit(maxPageNumbersLimit - pageNumbersLimit);
      setMinPageNumbersLimit(minPageNumbersLimit - pageNumbersLimit);
    }
  };

  const onNextPage = () => {
    setCurrentPage(currentPage + 1);
    if (currentPage + 1 > maxPageNumbersLimit) {
      setMaxPageNumbersLimit(maxPageNumbersLimit + pageNumbersLimit);
      setMinPageNumbersLimit(minPageNumbersLimit + pageNumbersLimit);
    }
  };

  let pageIncrementBtn = null;
  if (pageNumbers.length > maxPageNumbersLimit) {
    pageIncrementBtn = (
      <li onClick={onNextPage}>
        <span className="pagination-ellipsis">&hellip;</span>
      </li>
    );
  }

  let pageDecrementBtn = null;
  if (pageNumbers.length > maxPageNumbersLimit) {
    pageDecrementBtn = (
      <li onClick={onPreviousPage}>
        <span className="pagination-ellipsis">&hellip;</span>
      </li>
    );
  }

  const onSpecificPage = (n: number) => {
    setCurrentPage(n);
  };

  for (let i = 1; i <= Math.ceil(totalSamples / samplesForPage); i++) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = pageNumbers.map((noPage) => {
    if (noPage < maxPageNumbersLimit + 1 && noPage > minPageNumbersLimit) {
      return (
        <li key={noPage}>
          <a
            className={`pagination-link ${
              noPage === currentPage ? "is-current" : ""
            }`}
            onClick={() => onSpecificPage(noPage)}
          >
            {noPage}
          </a>
        </li>
      );
    } else {
      return null;
    }
  });

  return (
    <nav className="pagination mt-5 is-centered" role="navigation" aria-label="pagination">
      <Button
        className={`pagination-previous ${
          currentPage === 1 ? "is-disabled" : ""
        }`}
        color="link"
        disabled={currentPage <= 1}
        onClick={onPreviousPage}
      >
        Anterior
      </Button>
      <Button
        className={`pagination-next ${
          currentPage >= pageNumbers.length ? "is-disabled" : ""
        }`}
        color="link"
        disabled={currentPage === pageNumbers.length}
        onClick={onNextPage}
      >
        Siguiente
      </Button>
      <ul className="pagination-list">
        {pageIncrementBtn}
        {renderPageNumbers}
        {pageDecrementBtn}
      </ul>
    </nav>
  );
};

export default Pagination;