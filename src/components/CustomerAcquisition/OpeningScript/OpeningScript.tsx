import * as React from "react";
import { IStoreLoad, IOpeningScript } from '../../interfaces/global'
import css from './OpeningScript.module.scss'

const OpeningScript = (props: IOpeningScript) => {
    const { openingText, loading } = props

    const onChange = (e: any) => {
        console.log('e', e)
    }

    if (loading) {
        return (<div>Loading...</div>)
    }
  
    return (
        <div className={`${css.textArea} ${css.openingScriptContainer}`}>
            <label className={css.title}>Opening Script:</label>
            <textarea value={openingText} onChange={onChange} />
        </div>
    )
  }
  
  export default OpeningScript
  