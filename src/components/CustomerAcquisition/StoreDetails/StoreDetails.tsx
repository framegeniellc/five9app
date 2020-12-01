import * as React from "react";
import { IStoreDetails } from '../../interfaces/global'
import Loading from '../../Loading/Loading'
import css from './StoreDetails.module.scss'

const StoreDetails = (props: IStoreDetails) => {
    const { text, loading } = props

    const onChange = (e: any) => {
        console.log('e', e)
    }

    if (loading) {
        return (<Loading />)
    }
  
    return (
        <div className={`${css.textArea} ${css.storeDetailsContainer}`}>
            <label className={css.title}>Store Details:</label>
            <textarea disabled value={text || ''} onChange={onChange} />
        </div>
    )
  }
  
  export default StoreDetails
  