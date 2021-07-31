import BSPagination from 'react-bootstrap/Pagination';

export const Pagination = ({ searchResults, currentPage, setCurrentPage }) => {
  // convert page count to array
  const pageCount = (searchResults.totalResults) ? Math.ceil(searchResults.totalResults / 10) : [];
  const pageCountArr = [];
  for(let i = 0; i < pageCount; i++){
    pageCountArr.push({ count: i+1 })
  }

  // Build pagination options
  const startingPages = pageCountArr.slice(0, 2);

  const firstThreeDots = (currentPage > 3) ? [<BSPagination.Ellipsis disabled key="firstThreeDots" />] : [];

  const middlePages = (currentPage > 0) ? 
    pageCountArr.slice(Math.max(currentPage - 2,2), Math.min(currentPage + 1,pageCount - 2)) 
    : [];

  const lastThreeDots = (currentPage < pageCount-2) ? [<BSPagination.Ellipsis disabled key="lastThreeDots" />] : [];

  const endingPages = pageCountArr.slice(-2);

  // Build pagination buttons
  const buildPageList = (arr) => {
    return arr.map(({count}) => (
      <BSPagination.Item
        key={count}
        disabled={count === currentPage}
        onClick={() => setCurrentPage(count)}
      >
        {count}
      </BSPagination.Item>
    ))
  }

  let limitedPageCount = [].concat(
    buildPageList(startingPages),
    firstThreeDots,
    buildPageList(middlePages),
    lastThreeDots,
    buildPageList(endingPages),
  );

  return (
    <div>
      { (pageCount > 1) &&
        <BSPagination className="justify-content-center">
          <BSPagination.First key="first" disabled={currentPage === 1} onClick={() => setCurrentPage(1)} />
          <BSPagination.Prev key="previous" disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)} />
          <BSPagination.Item disabled>Page {currentPage} of {pageCount}</BSPagination.Item>
          <BSPagination.Next key="next" disabled={currentPage === pageCount} onClick={() => setCurrentPage(currentPage + 1)} />
          <BSPagination.Last key="last" disabled={currentPage === pageCount} onClick={() => setCurrentPage(pageCount)} />
        </BSPagination>
      }
      { (pageCount > 1) &&
        <BSPagination className="justify-content-center">
          { pageCount > 7 ? limitedPageCount : buildPageList(pageCountArr) }
        </BSPagination>
      }
    </div>
  )
}

export default Pagination;