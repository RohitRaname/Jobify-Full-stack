import React from "react";
import { useAppContext } from "../context/AppContext";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Wrapper from "../assets/wrappers/PageBtnContainer";

const PageBtnContainer = () => {
  const { page, numOfPages, changePage } = useAppContext();

  const prevPage = () => {
    let newPage = page - 1;
    if (newPage <1) newPage = numOfPages;
    changePage(newPage);
  };
  const nextPage = () => {
    let newPage = page + 1;
    if (newPage > numOfPages) newPage = 1;
    changePage(newPage);
  };

  const pages = new Array(numOfPages).fill("*").map((_, index) => index + 1);

  return (
    <Wrapper>
      <button className="prev-btn" onClick={prevPage}>
        <FaChevronLeft /> Prev
      </button>
      <div className="btn-container">
        {pages.map((pageNumber) => (
          <button
            key={pageNumber}
            className={page === pageNumber ? "pageBtn active" : "pageBtn"}
            onClick={() => changePage(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}
      </div>
      <button className="next-btn" onClick={nextPage}>
        Next
        <FaChevronRight />
      </button>
    </Wrapper>
  );
};

export default PageBtnContainer;
