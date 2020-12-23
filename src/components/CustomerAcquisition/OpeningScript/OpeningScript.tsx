import * as React from "react";
import CopyToClipboard from 'react-copy-to-clipboard'
import { IOpeningScript } from '../../interfaces/global'
import css from './OpeningScript.module.scss'
import { getStoreScript } from '../Common/store'


const OpeningScript = (props: IOpeningScript) => {
    const [copied, setCopied] = React.useState<boolean>(false)

    const onChange = (e: any) => {
        console.log('e', e)
    }

    const copyText = () => {
        setCopied(true)
        setTimeout( () => {
            setCopied(false)
        }, 2000)
    }

    console.log(props)

    return (
        <div className={`${css.textArea} ${css.openingScriptContainer}`}>
            <div className={css.headerOpening}>
                <label className={css.title}>Opening Script:</label>
                { props?.callID ? 
                <div className={css.clipboard}>
                    <input type="text" className={css.callID} value={`Call ID: ${props?.callID}`} disabled />
                    <CopyToClipboard text={props?.callID} onCopy={copyText}>
                        <button title="Copy text"><i className="fa fa-clone" aria-hidden="true"></i></button>
                    </CopyToClipboard>
                    {copied ? <span className={css.bubble}>Copied</span> : ''}
                </div>
                : ''}
            </div>
            <textarea disabled value={getStoreScript(props) || ``} onChange={onChange} />
        </div>
    )
  }
  
  export default OpeningScript
  