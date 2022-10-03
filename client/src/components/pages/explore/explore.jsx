import React from "react";
import { connect } from 'react-redux';
import { getAllRecipes, getAllDiets } from '../../../redux/actions/actions'
import './explore.css'
import Navbar from '../../navbar/navbar'
import Filters from '../../filters/filters'
import Views from '../../views/views'
import Pagination from '../../pagination/pagination'
import Footer from '../../footer/footer'
import Form from "../../form/form";

class Explore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1
    }
  }

  componentDidMount() {
    this.props.getAllRecipes()
    this.props.getAllDiets()
  }

  changePage(page) {
    this.setState({ currentPage: page })
  }

  render() {
    const numberOfPages = Math.ceil(this.props.recipes.length / 9)

    return (
      <div id="main">
        <Navbar />
        <Filters />
        <Views currentPage={this.state.currentPage} />
        <Pagination pages={numberOfPages} changePage={this.changePage.bind(this)} currentPage={this.state.currentPage} />
        <Footer />
        {this.props.showCreateRecipes && <Form />}
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllRecipes: () => dispatch(getAllRecipes()),
    getAllDiets: () => dispatch(getAllDiets())
  }
};

export const mapStateToProps = (state) => {
  return {
    recipes: state.recipes,
    showCreateRecipes: state.showCreateRecipes
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Explore);
