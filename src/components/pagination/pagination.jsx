import { usePagination, dots } from "./usePagination";
import classnames from 'classnames';

const Pagination = ({ onPageChange, totalCount, siblingCount = 1, currentPage, pageSize, paginationcss }) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  }
  const onPrevious = () => {
    onPageChange(currentPage - 1);
  }

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <ul className={classnames({
      [paginationcss
      ]: paginationcss
    })} >

      {
        paginationRange.map(pageNumber => {
          return (
            <li onClick={() => onPageChange(pageNumber)}>
              {pageNumber}
            </li>
          )
        })
      }

    </ul >
  )
}

export default Pagination;

