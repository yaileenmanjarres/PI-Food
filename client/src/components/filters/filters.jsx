import './filters.css';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentFilters } from '../../redux/actions/actions';

function Filters() {
  const dispatch = useDispatch()
  const diets = useSelector(state => state.diets).map(diet => diet.name)
  const currentFilters = useSelector(state => state.currentFilters)

  const filters = [
    {
      name: 'alphabetically',
      title: 'Order alphabetically',
      options: [
        'none',
        'A - Z',
        'Z - A'
      ]
    },
    {
      name: 'healthScore',
      title: 'Order by health score',
      options: [
        'none',
        'Ascendent',
        'Descendent'
      ]
    },
    {
      name: 'diet',
      title: 'Filter by diet',
      options: ['all'].concat(diets)
    }
  ]

  const handleChange = (event) => {
    const property = event.target.name

    const newFilters = { 
      ...currentFilters,
      [property]: event.target.value
    }

    if (property === 'alphabetically') {
      newFilters.healthScore = 'none'
    }
    if (property === 'healthScore') {
      newFilters.alphabetically = 'none'
    }

    dispatch(setCurrentFilters(newFilters))
  }

  return (
    <div className='filters-container' >
      <div className='filters'>
        {
          filters.map(filter => {
            return (
              <div className='filter' key={filter.title}>
                <span>{filter.title} </span>
                <select onChange={handleChange} name={filter.name}>
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
