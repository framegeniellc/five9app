import * as React from "react";
import * as ReactDOM from "react-dom";

import css from 'StoreDetails.scss'

interface IStoreDetails {
    name: string,
}

const StoreDetails = (props: IStoreDetails) => {
    //const [data, setData] = React.useState<string | undefined>(props.data)
  
    return (
        <div className={css.specialNotesContainer}>
            test
        </div>
    )
  }
  
  export default StoreDetails