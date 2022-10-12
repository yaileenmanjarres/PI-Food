import { useDispatch } from "react-redux"
import { Link } from "react-router-dom";
import { getRecipeByName, getAllRecipes} from '../../redux/actions/actions'
import './navbar.css';

function Navbar() {
  const dispatch = useDispatch()

  const onSearch = (event) => {
    event.preventDefault()
    const input = document.getElementById('search-input')
    const name = input.value;
    if (name.length > 0) {
      dispatch(getRecipeByName(name))
    }
  }

  const backToHome = () => {
    document.getElementById('alphabetically').value = 'none'
    document.getElementById('healthScore').value = 'none'
    document.getElementById('diet').value = 'all'
    dispatch(getAllRecipes())
  }

  

  return (
    <div id='navbar-container'>

      <nav id='navbar'>
        {/* logo */}
        <span id='logo' onClick={backToHome}>
          <i className="fas fa-utensils logo-icon" />
          <span id='logo-text'>
            Food
          </span>
        </span>

        {/* search */}
        <form id='search-container' onSubmit={onSearch}>
          <input type="text" placeholder="Search" id='search-input' />
          <span id='search-icon' onClick={onSearch}>
            <i className="fas fa-search"></i>
          </span>
        </form>

        {/* button */}
        <Link to={'/explore/create-recipe'}>
          <button id='button-create'>
            NEW RECIPE
          </button>
        </Link>
      </nav>
    </div>
  )
}

export default Navbar;
