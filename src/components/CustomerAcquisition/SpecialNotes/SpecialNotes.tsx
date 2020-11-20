import * as React from "react";
import * as ReactDOM from "react-dom";

import css from 'SpecialNotes.scss'

interface ISpecialNotes {
    name: string,
}

const SpecialNotes = (props: ISpecialNotes) => {
    //const [data, setData] = React.useState<string | undefined>(props.data)
  
    return (
        <div className={css.specialNotesContainer}>
            test
        </div>
    )
  }
  
  export default SpecialNotes