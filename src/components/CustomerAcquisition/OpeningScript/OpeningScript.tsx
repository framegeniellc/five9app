import * as React from "react";
import { IOpeningScript } from '../../interfaces/global'
import css from './OpeningScript.module.scss'
import { getStoreScript } from '../Common/store'

const OpeningScript = (props: IOpeningScript) => {
    const { IVR, store } = props

    const onChange = (e: any) => {
        console.log('e', e)
    }
  
    return (
        <div className={`${css.textArea} ${css.openingScriptContainer}`}>
            <label className={css.title}>Opening Script:</label>
            <textarea value={getStoreScript(IVR, store) || ``} onChange={onChange} />
        </div>
    )
  }
  
  export default OpeningScript
  