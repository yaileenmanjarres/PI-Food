import React from "react";
import { connect } from 'react-redux';
import { getAllRecipes } from '../../../redux/actions/actions'
import './explore.css'
import Navbar from '../../navbar/navbar'
import Filters from '../../filters/filters'
import Views from '../../views/views'
import Pagination from '../../pagination/pagination'
import Footer from '../../footer/footer'
//import Form from "../../form/form";

class Explore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      allRecipes: this.props.recipes
    }
  }

  componentDidMount() {
    this.props.getAllRecipes()
  }

  changePage(page) {
    this.setState(state => ({
      ...state,
      currentPage: page
    }))
  }

  update(recipes) {
    this.setState(state => ({
      ...state,
      allRecipes: recipes
    }))
  }

  handlePagesClick(clicked) {

    if (clicked === 1) {
      // setShownCountries(allCountries.slice(0, 10));
    } else {
      // setShownCountries(allCountries.slice((10 * clicked) - 10, 10 * clicked));
    }
  }

  render() {
    console.log(this);
    const numberOfPages = Math.ceil(this.props.recipes.length / 9)
    return (
      <div id="main">
        <div>
          {
            this.state.currentPage
          }
        </div>
        <Navbar />
        <Filters />
        <Views />
        <Pagination pages={numberOfPages} changePage={this.changePage.bind(this)} />
        <Footer />
        {/* <Form /> */}
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllRecipes: () => dispatch(getAllRecipes())
  }
};

export const mapStateToProps = (state) => {
  return { recipes: state.recipes }
};

export default connect(mapStateToProps, mapDispatchToProps)(Explore);
