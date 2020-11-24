import * as React from "react";
import * as ReactDOM from "react-dom";

import css from '././CustomerAcquisition.module.scss'
import StoreInformation from './StoreInformation/StoreInformation'
import OpeningScript from './OpeningScript/OpeningScript'
import StoreDetails from './StoreDetails/StoreDetails'
import SpecialNotes from './SpecialNotes/SpecialNotes'
import SearchBox from './SearchBox/SearchBox'

const CustomerAcquisition = () => {
    
    return (
        <div className={css.customerAcquisition}>
            <div className={css.header}>
                <SearchBox></SearchBox>
            </div>
            <div className={css.column}>
                <div className={`${css.columnItem} ${css.details}`}>
                    <OpeningScript></OpeningScript>
                    <StoreDetails></StoreDetails>
                    <SpecialNotes></SpecialNotes>
                </div>
                <div className={`${css.columnItem} ${css.storeInformation}`}>
                    <StoreInformation></StoreInformation>
                </div>  
            </div> 
        </div>
    )
  }
  
  export default CustomerAcquisition