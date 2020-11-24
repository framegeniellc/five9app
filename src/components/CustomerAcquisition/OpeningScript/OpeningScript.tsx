import * as React from "react";
import { IStoreLoad, IOpeningScript } from '../../interfaces/global'
import Loading from '../../Loading/Loading'
import css from './OpeningScript.module.scss'

const OpeningScript = (props: IOpeningScript) => {
    const { openingText, loading } = props

    const onChange = (e: any) => {
        console.log('e', e)
    }

    if (loading) {
        return (<Loading />)
    }
  
    return (
        <div className={`${css.textArea} ${css.openingScriptContainer}`}>
            <label className={css.title}>Opening Script:</label>
            <textarea value={openingText} onChange={onChange} />
        </div>
    )
  }
  
  export default OpeningScript
  