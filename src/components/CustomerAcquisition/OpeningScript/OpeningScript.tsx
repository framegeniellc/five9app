import * as React from "react";
import * as ReactDOM from "react-dom";

import css from 'OpeningScript.scss'

interface IOpeningScript {
    name: string,
}

const OpeningScript = (props: IOpeningScript) => {
    //const [data, setData] = React.useState<string | undefined>(props.data)
  
    return (
        <div className={css.specialNotesContainer}>
            test
        </div>
    )
  }
  
  export default OpeningScript