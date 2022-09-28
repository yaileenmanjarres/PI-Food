import './filters.css';

const filters = [
  {
    title: 'Title 1',
    options: [
      'Option 1',
      'Option 2',
      'Option 3',
      'Option 4'
    ]
  },
  {
    title: 'Title 2',
    options: [
      'Option 1',
      'Option 2',
      'Option 3',
      'Option 4',
      'Option 5',
      'Option 6',
    ]
  },
  {
    title: 'Title 3',
    options: [
      'Option 1',
      'Option 2'
    ]
  },
  {
    title: 'Title 4',
    options: [
      'Option 1',
      'Option 2',
      'Option 3'
    ]
  },
]

function Filters() {
  return (
    <div className='filters-container' >
      <div className='filters'>
        {
          filters.map(filter => {
            return (
              <div className='filter' key={filter.title}>
                <select>
                  <option> {filter.title}  </option>
                  {
                    filter.options.map(option => <option key={option}> {option} </option>)
                  }
                </select>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Filters;
