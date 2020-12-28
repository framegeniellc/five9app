import * as React from "react";
import Loading from '../../Loading/Loading'
import { ISpecialNotes } from '../../interfaces/global'
import css from './SpecialNotes.module.scss'

const SpecialNotes = (props: ISpecialNotes) => {
    const { text } = props

    const onChange = (e: any) => {
        console.log('e', e)
    }

 
    return (
        <div className={`${css.textArea} ${css.specialNotesContainer}`}>
            <label className={css.title}>Special Notes:</label>
            <textarea disabled value={text || ``} onChange={onChange} />
        </div>
    )
  }
  
  export default SpecialNotes
  