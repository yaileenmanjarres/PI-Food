import './navbar.css';

function Navbar() {
  return (
    <div id='navbar-container'>

    <nav id='navbar'>
      {/* logo */}
      <span id='logo'>
        <i className="fas fa-home logo-icon" />
        <span id='logo-text'>
          Nombre
        </span>
      </span>

      {/* search */}
      <div id='search-container'>
        <input type="text" placeholder="Search" id='search-input' />
        <span id='search-icon' >
          <i className="fas fa-search"></i>
        </span>
      </div>

      {/* button */}
      <span >
        <button id='button-create'>
          CREATE
        </button>
      </span>
    </nav>
    </div>
  )
}

export default Navbar;
