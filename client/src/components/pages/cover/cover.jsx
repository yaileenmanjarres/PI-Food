import React from "react";
import { Link } from "react-router-dom";
import './cover.css';

class Cover extends React.Component {
  render() {
    return (
      <div className="container">
        <div className='title'> PI - Yaileen Manjarrés</div>
        <div className="button-container">

        <Link to="/explore" className='button'> <span> EXPLORE </span> </Link>
        </div>
      </div>
    )
  }
}

export default Cover;
