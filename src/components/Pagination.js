import { Button } from "react-bootstrap";

export const Pagination = ({ searchResults, currentPage, setCurrentPage }) => {
  // convert page count to array
  const pageCount = (searchResults.totalResults) ? Math.ceil(searchResults.totalResults / 10) : [];
  const pageCountArr = [];
  for(let i = 0; i < pageCount; i++){
    pageCountArr.push({ count: i+1 })
  }

  // Build pagination options
  const startingPages = pageCountArr.slice(0, 2);

  const firstThreeDots = (currentPage > 3) ? [<span key="firstThreeDots">...</span>] : [];

  const middlePages = (currentPage > 0) ? 
    pageCountArr.slice(Math.max(currentPage - 1,2), Math.min(currentPage + 1,pageCount - 1)) 
    : [];

  const lastThreeDots = (currentPage < pageCount-2) ? [<span key="lastThreeDots">...</span>] : [];

  const endingPages = pageCountArr.slice(-2);

  // Build pagination buttons
  const buildPageList = (arr) => {
    return arr.map(({count}) => (
      <Button
        key={count}
        disabled={count === currentPage}
        onClick={() => setCurrentPage(count)}
      >
        {count}
      </Button>
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
    <div className="text-center">
      { (pageCount > 1) &&
        <div>
          <Button key="previous" disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>&lt;</Button>
          <Button disabled>Page {currentPage} of {pageCount}</Button>  
          <Button key="next" disabled={currentPage === pageCount} onClick={() => setCurrentPage(currentPage + 1)}>&gt;</Button>
        </div>
      }
      { (pageCount > 1) &&
        ( pageCount > 7 ? limitedPageCount : buildPageList(pageCountArr) )
      }
    </div>
  )
}

export default Pagination;