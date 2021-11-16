import React from 'react';
import { getPagesArray } from '../../../utils/pages';

function Pagination({ totalPages, page, changePage }) {
  let pagesArray = getPagesArray(totalPages);

  return (
    <div className="page__wrapper">
      {pagesArray.map((num) => (
        <span
          onClick={() => changePage(num)}
          key={num}
          className={num === page ? 'page  page__current' : 'page'}
        >
          {num}
        </span>
      ))}
    </div>
  );
}

export default Pagination;
