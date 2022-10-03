import { useDispatch } from "react-redux"
import { getRecipeByName, getAllRecipes, showCreateRecipes } from '../../redux/actions/actions'
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
        <span >
          <button id='button-create' onClick={() => dispatch(showCreateRecipes(true))}>
            NEW RECIPE
          </button>
        </span>
      </nav>
    </div>
  )
}

export default Navbar;
