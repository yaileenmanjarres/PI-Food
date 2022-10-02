import { useDispatch } from "react-redux"
import { getRecipeByName, getAllRecipes } from '../../redux/actions/actions'
import './navbar.css';

function Navbar() {
  const dispatch = useDispatch()
  const onSearch = (event) => {
    event.preventDefault()
    const input = document.getElementById('search-input')
    const name = input.value;
    console.log(name);
    if (name.length === 0) {
      dispatch(getAllRecipes())
    }
    // dispatch(getRecipeByName(name))

  }

  return (
    <div id='navbar-container'>

      <nav id='navbar'>
        {/* logo */}
        <span id='logo'>
          <i className="fas fa-utensils logo-icon" /> 
          <span id='logo-text'>
            Food
          </span>
        </span>

        {/* search */}
        <form id='search-container' onSubmit={onSearch}>
          <input type="text" placeholder="Search" id='search-input' />
          <span id='search-icon' >
            <i className="fas fa-search"></i>
          </span>
        </form>

        {/* button */}
        <span >
          <button id='button-create'>
            NEW RECIPE
          </button>
        </span>
      </nav>
    </div>
  )
}

export default Navbar;
