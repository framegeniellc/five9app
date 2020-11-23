import * as React from "react";
import * as ReactDOM from "react-dom";

import css from './OpeningScript.module.scss'

interface IOpeningScript {
    //name: string,
}

const OpeningScript = (props: IOpeningScript) => {
    //const [data, setData] = React.useState<string | undefined>(props.data)
  
    return (
        <div className={`${css.textArea} ${css.openingScriptContainer}`}>
            <label className={css.title}>Opening Script:</label>
            <textarea disabled>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </textarea>
        </div>
    )
  }
  
  export default OpeningScript