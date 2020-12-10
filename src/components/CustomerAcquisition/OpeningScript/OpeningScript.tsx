import * as React from "react";
import { IOpeningScript } from '../../interfaces/global'
import css from './OpeningScript.module.scss'
import { getStoreScript } from '../Common/store'

const OpeningScript = (props: IOpeningScript) => {

    const onChange = (e: any) => {
        console.log('e', e)
    }

    return (
        <div className={`${css.textArea} ${css.openingScriptContainer}`}>
            <label className={css.title}>Opening Script:</label>
            <textarea disabled value={getStoreScript(props) || ``} onChange={onChange} />
        </div>
    )
  }
  
  export default OpeningScript
  