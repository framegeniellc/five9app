import * as React from "react"
import css from '././CustomerAcquisition.module.scss'
import { IGlobalProps } from '../interfaces/global'
import getEndpointData from '../../services/zeus/store'
import StoreInformation from './StoreInformation/StoreInformation'
import OpeningScript from './OpeningScript/OpeningScript'
import StoreDetails from './StoreDetails/StoreDetails'
import SpecialNotes from './SpecialNotes/SpecialNotes'
import SearchBox from './SearchBox/SearchBox'
import Error from '../Error/Error'

const CustomerAcquisition = (props: IGlobalProps) => {
    const { interceptor, storeId } = props
    const [store, setStore] = React.useState<any>([])
    const [doctors, setDoctors] = React.useState<any>([])
    const [examRooms, setExamRooms] = React.useState<any>([])
    const [existStore, setExistsStore] = React.useState<boolean>(false)
    const [loading, setLoading] = React.useState<boolean>(true)
    const [selectedStoreId, setSelectedStoreId] = React.useState<number>(storeId)
    

    const setStoreInfo = async () => {
        const storeData = await getEndpointData(interceptor, selectedStoreId, 'info')
        const doctorsData = await getEndpointData(interceptor, selectedStoreId, 'doctors')
        const examRoomsData = await getEndpointData(interceptor, selectedStoreId, 'rooms')

        setDoctors(doctorsData?.data)
        setStore(storeData?.data)
        setExamRooms(examRoomsData?.data)
        
        if (storeData?.data) {
            setExistsStore(true)    
        }

        setLoading(false)
    }



    React.useEffect(() => {
        setStoreInfo()
    }, [selectedStoreId])

    return (<div>{existStore ? (
                <div className={css.customerAcquisition}>
                    <div className={css.header}>
                        <SearchBox setStoreInfo={setStoreInfo} interceptor={interceptor} setSelectedStoreId={setSelectedStoreId} />
                    </div>
                    <div className={css.column}>
                        <div className={`${css.columnItem} ${css.details}`}>
                            <OpeningScript openingText={store?.StoreScriptOperning} loading={loading} />
                            <StoreDetails text={store?.StoreDetails} loading={loading} />
                            <SpecialNotes text={store?.Alerts} loading={loading} />
                        </div>
                        <div className={`${css.columnItem} ${css.storeInformation}`}>
                            <StoreInformation store={store} loading={loading} doctors={doctors} rooms={examRooms} />
                        </div>  
                    </div> 
                </div>) : (<Error error={`404`}/>)
        }
        </div>
    )
  }
  
  export default CustomerAcquisition
