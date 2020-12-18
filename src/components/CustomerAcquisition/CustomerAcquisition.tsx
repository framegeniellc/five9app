import * as React from "react"
import css from '././CustomerAcquisition.module.scss'
import { IGlobalProps } from '../interfaces/global'
import { getEndpointData, getCachedData } from '../../services/zeus/store'
import StoreInformation from './StoreInformation/StoreInformation'
import OpeningScript from './OpeningScript/OpeningScript'
import StoreDetails from './StoreDetails/StoreDetails'
import SpecialNotes from './SpecialNotes/SpecialNotes'
import SearchBox from './SearchBox/SearchBox'
import StoreItem from './SearchBox/StoreItem/StoreItem'
import Error from '../Error/Error'
import Loading from "../Loading/Loading"

const CustomerAcquisition = (props: IGlobalProps) => {
    const { interceptor, storeId, IVR, language, brand, skill, callID, setErrorMessage} = props
    const [stores, setStores] = React.useState<any>([])
    const [store, setStore] = React.useState<any>([])
    const [doctors, setDoctors] = React.useState<any>([])
    const [examRooms, setExamRooms] = React.useState<any>([])
    const [existStore, setExistsStore] = React.useState<boolean>(false)
    const [loading, setLoading] = React.useState<boolean>(true)
    const [selectedStoreId, setSelectedStoreId] = React.useState<number>(storeId)
    const [geoResponse, setGeoResponse] = React.useState<any>(null)
    const [specialStore, setSpecialStore] = React.useState<boolean>(false)
    const [error, setError] = React.useState<boolean>(false)

    const setStoreInfo = async () => {
        const storesData = await getCachedData(interceptor, null, 'info')
        const storeData = await getCachedData(interceptor, selectedStoreId, 'info')
        const doctorsData = await getCachedData(interceptor, selectedStoreId, 'doctors')
        const examRoomsData = await getCachedData(interceptor, selectedStoreId, 'rooms')

        setDoctors(doctorsData?.data)
        setStore(storeData?.data[0])
        setExamRooms(examRoomsData?.data)
        setStores(storesData?.data)

        setErrorMessage('')

        if (storeData && storeData.data && storeData.data?.length > 0) {
            setExistsStore(true)   
            setError(false)
            setLoading(false)
        } else {
            setError(true)
        }

        if (!storesData && !storeData && !doctorsData && !examRoomsData) {
            setErrorMessage('Connection with store information is not available, please try again later')
        }

        setLoading(false)

    }

    const defineLanguage = () => {
        return Number(language) === 2 ? 'es' : 'en'
    }

    const cleanStoreId = (storeId: number) => {
        const specialStores = [958, 971, 977]

        if (specialStores.indexOf(storeId) > -1) {
            setSpecialStore(true)
            storeId = Number(storeId.toString().substring(1))
        }
        
        return storeId
    }

    React.useEffect(() => {
        setLoading(true)
        if(storeId == 958 || storeId == 971 || storeId == 977) {
            setSelectedStoreId(cleanStoreId(storeId))
        }
        setStoreInfo()
    }, [selectedStoreId])

    return (loading ? ( <Loading></Loading>) : (
            <div>
                    <div className={css.customerAcquisition}>
                        <div className={css.header}>
                            <SearchBox setStoreInfo={setStoreInfo} store={store} setSelectedStoreId={setSelectedStoreId} setGeoResponse={setGeoResponse} stores={stores} />
                        </div>
                        <div className={css.column}>
                            <div className={`${css.columnItem} ${css.details}`}>
                                <div>
                                    <OpeningScript IVR={IVR} store={store} language={defineLanguage()} brand={brand} skill={skill} specialStore={specialStore} callID={callID} />
                                    <StoreDetails text={store?.LandMarks} />
                                    <SpecialNotes text={store?.Alerts} />
                                </div>
                            </div>
                            {existStore && 
                            <div className={`${css.columnItem} ${css.storeInformation}`}>
                                <StoreInformation store={store} loading={loading} doctors={doctors} rooms={examRooms} />
                                {//setTimezone={setTimezone}
                                }
                            </div>  
                            }
                        </div> 
                    </div>
            </div>
        )
    )
    }
  
  export default CustomerAcquisition
