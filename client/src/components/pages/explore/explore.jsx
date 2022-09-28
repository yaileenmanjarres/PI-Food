import React from "react";
import './explore.css'
import Navbar from '../../navbar/navbar'
import Filters from '../../filters/filters'
import Views from '../../views/views'
import Pagination from '../../pagination/pagination'
import Footer from '../../footer/footer'
//import Form from "../../form/form";

const pages = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
  11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  21, 22, 23, 24, 25
]


class Explore extends React.Component {
  render() {
    return (
      <div id="main">
        <Navbar />
        <Filters />
        <Views />
        <Pagination pages={pages}/>
        <Footer />
        {/* <Form /> */}
      </div>
    )
  }
}

export default Explore;
