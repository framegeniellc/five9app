import * as React from "react";
import * as ReactDOM from "react-dom";

import css from '././CustomerAcquisition.module.scss'
import { IGlobalProps } from '../interfaces/global'
import getEndpointData from '../../services/zeus/store'
import StoreInformation from './StoreInformation/StoreInformation'
import OpeningScript from './OpeningScript/OpeningScript'
import StoreDetails from './StoreDetails/StoreDetails'
import SpecialNotes from './SpecialNotes/SpecialNotes'
import SearchBox from './SearchBox/SearchBox'

const CustomerAcquisition = (props: IGlobalProps) => {
    const [store, setStore] = React.useState<any>([])
    const [loading, setLoading] = React.useState<boolean>(true)
    const { interceptor, storeId } = props

    const setStoreInfo = async () => {
        const { interceptor, storeId } = props
        const store = await getEndpointData(interceptor, storeId, 'info')

        console.log('store', store)

        setStore(store?.data)
        setLoading(false)
    }

    React.useEffect(() => {
        setStoreInfo()
    }, [])

    return (
        <div className={css.customerAcquisition}>
            <div className={css.header}>
                <SearchBox></SearchBox>
            </div>
            <div className={css.column}>
                <div className={`${css.columnItem} ${css.details}`}>
                    <OpeningScript openingText={store?.StoreScriptOperning} loading={loading} ></OpeningScript>
                    <StoreDetails text={store?.StoreDetails} loading={loading}></StoreDetails>
                    <SpecialNotes></SpecialNotes>
                </div>
                <div className={`${css.columnItem} ${css.storeInformation}`}>
                    <StoreInformation store={store} loading={loading} />
                </div>  
            </div> 
        </div>
    )
  }
  
  export default CustomerAcquisition
