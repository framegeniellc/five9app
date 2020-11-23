import * as React from "react";
import * as ReactDOM from "react-dom";

import css from '././CustomerAcquisition.module.scss'
import StoreInformation from './StoreInformation/StoreInformation'
import OpeningScript from './OpeningScript/OpeningScript'
import StoreDetails from './StoreDetails/StoreDetails'
import SpecialNotes from './SpecialNotes/SpecialNotes'

const CustomerAcquisition = () => {
    //const [data, setData] = React.useState<string | undefined>(props.data)
  
    return (
        <div className={css.column}>
            <div className={css.half}>
                <OpeningScript></OpeningScript>
                <StoreDetails></StoreDetails>
                <SpecialNotes></SpecialNotes>
            </div>
            <div className={css.half}>
                <StoreInformation></StoreInformation>
            </div>   
        </div>
    )
  }
  
  export default CustomerAcquisition