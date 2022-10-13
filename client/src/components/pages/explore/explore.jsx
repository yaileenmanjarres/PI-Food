import React from "react";
import { connect } from 'react-redux';
import { getAllRecipes, getAllDiets } from '../../../redux/actions/actions'
import './explore.css'
import Navbar from '../../navbar/navbar'
import Filters from '../../filters/filters'
import Views from '../../views/views'
import Modal from '../../modal/modal'
import Pagination from '../../pagination/pagination'
import Footer from '../../footer/footer'
import Form from "../../form/form";

class Explore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      paginationNumber: 0
    }
  }

  componentDidMount() {
    this.props.getAllRecipes()
    this.props.getAllDiets()
  }

  changePage(page) {
    this.setState(state => ({
      ...state,
      currentPage: page
    }))
  }

  handlePagination(num) {
    const numberOfPages = Math.ceil(num / 9) 
    if (this.state.currentPage <= numberOfPages) {
      this.setState(state => ({
        ...state,
        paginationNumber: numberOfPages
      }))
    } else {
      this.setState({
        currentPage: 1,
        paginationNumber: numberOfPages
      })
      
    }
  }

  render() {
    const showModal = this.props.showModal

    return (
      <div id="main">
        <Navbar />
        <Filters />
        <Views currentPage={this.state.currentPage} handlePagination={this.handlePagination.bind(this)} />
        {
          showModal && <Modal />
        }
        <Pagination pages={this.state.paginationNumber} changePage={this.changePage.bind(this)} currentPage={this.state.currentPage} />
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
    showCreateRecipes: state.showCreateRecipes,
    showModal: state.showModal
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Explore);
