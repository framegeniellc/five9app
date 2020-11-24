import * as React from "react"
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
        const store = await getEndpointData(interceptor, storeId, 'info')

        setStore(store?.data)
        setLoading(false)
    }

    React.useEffect(() => {
        setStoreInfo()
    }, [])

    return (
        <div className={css.customerAcquisition}>
            <div className={css.header}>
                <SearchBox setStore={setStore} interceptor={interceptor} />
            </div>
            <div className={css.column}>
                <div className={`${css.columnItem} ${css.details}`}>
                    <OpeningScript openingText={store?.StoreScriptOperning} loading={loading} />
                    <StoreDetails text={store?.StoreDetails} loading={loading} />
                    <SpecialNotes text={interceptor} loading={loading} />
                </div>
                <div className={`${css.columnItem} ${css.storeInformation}`}>
                    <StoreInformation store={store} loading={loading} />
                </div>  
            </div> 
        </div>
    )
  }
  
  export default CustomerAcquisition
