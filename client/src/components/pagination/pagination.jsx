import './pagination.css';

function Pagination({ pages = []}) {
  // const { arrayX = []} = props
  // const pages = props.arrayX || []

  return (
    <div className='pagination-container'>
      {
        pages.map((page) => (
          <span className='pagination' onClick={() => console.log(page)} key={page} > {page}
          </span>
        ))
      }
    </div>
  )
}

export default Pagination
