import './pagination.css';

function Pagination({ pages = 0, changePage, currentPage }) {
  let numberOfPages = []

  for (let i = 1; i <= pages; i++) {
    numberOfPages.push(i)
  }

  return (
    <div className='pagination-container'>
      {
        numberOfPages.map((page) => (
          <span
            className={`pagination ${page === currentPage ? 'active-page' : ''}`}
            onClick={() => changePage(page)}
            key={page}
          >
            {page}
          </span>
        ))
      }
    </div>
  )
}

export default Pagination
