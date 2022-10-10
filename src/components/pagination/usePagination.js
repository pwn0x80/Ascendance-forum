import { useMemo } from "react"

export const dots = "..."

const range = (start, end) => {
  return [...Array(end).keys()].map((el) => el + start)
}


export const usePagination = ({
  totalCount,
  pageSize,
  siblingCount = 1,
  currentPage
}) => {
  const paginationRange = useMemo(() => {

    const totalPageCount = Math.ceil(totalCount / pageSize);
    console.log(totalCount)
    const totalPageNumbers = siblingCount + 5;
    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPageCount
    )

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2
    if (!shouldShowLeftDots && shouldShowRightDots) {

      let leftItemCount = 5;
      let leftRange = range(1, leftItemCount);
      return [...leftRange, dots, totalPageCount];
    }
    if (shouldShowLeftDots && !shouldShowRightDots) {

      let rightItemCount = 5;
      let rightRange = range(totalPageCount - rightItemCount, totalPageCount);
      return [firstPageIndex, dots, ...rightRange];
    }

    if (shouldShowRightDots && shouldShowLeftDots) {


      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, dots, ...middleRange, dots, lastPageIndex];
    }


  }, [totalCount, pageSize, siblingCount, currentPage])
  return paginationRange;

}
