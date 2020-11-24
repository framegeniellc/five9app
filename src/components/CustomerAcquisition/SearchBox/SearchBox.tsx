import * as React from "react";
import * as ReactDOM from "react-dom";

import css from './SearchBox.module.scss'

const SearchBox = () => {
  
    return (
        <React.Fragment>
            <form className={css.searchBox}>
                <select>
                    <option value="" selected>Search by Store # or Name</option>
                    <option value="">Mishawaka</option>
                    <option value="">Bakersfield</option>
                    <option value="">Little Rock</option>
                </select>
            </form>
        </React.Fragment>
    )
  }
  
  export default SearchBox