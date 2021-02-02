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
import DoctorSchedule from '../Doctors/DoctorSchedule'
import Loading from "../Loading/Loading"
import { MENU_ITEM } from '../Menu/Menu'


const CustomerAcquisition = (props: IGlobalProps) => {
    const { interceptor, storeId, IVR, language, brand, skill, callID, option, setTimezone, setErrorMessage} = props 
    const [appData, setAppData] = React.useState<any>({})
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

        const [storesData, storeData] = await Promise.all([getCachedData(interceptor, null, 'info'), getCachedData(interceptor, selectedStoreId, 'info')]);

        //doctorsData
        //examRoomsData
        //getCachedData(interceptor, selectedStoreId, 'doctors'), getCachedData(interceptor, selectedStoreId, 'rooms')
        setAppData({
            //doctors: doctorsData?.data,
            store: storeData?.data[0],
            //examRooms: examRoomsData?.data,
            stores: storesData?.data
        })

        if (storeData && storeData.data && storeData.data?.length > 0) {
            setExistsStore(true)   
            //setError(false)
            setLoading(false)
            setTimezone(storeData?.data[0].TimeZon)
        } else {
            //setError(true)
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
        setTimezone('')
        if(storeId == 958 || storeId == 971 || storeId == 977) {
            setSelectedStoreId(cleanStoreId(storeId))
        }
        setStoreInfo()
    }, [selectedStoreId])

    return (loading ? ( <Loading></Loading>) : (
            <div>
                    <div className={css.customerAcquisition}>
                        <div className={css.header}>
                            <SearchBox setStoreInfo={setStoreInfo} store={appData?.store} setSelectedStoreId={setSelectedStoreId} setGeoResponse={setGeoResponse} stores={appData?.stores} />
                        </div>
                        { option === MENU_ITEM.STORE ?
                        <div className={css.column}>
                            <div className={`${css.columnItem} ${css.details}`}>
                                <div>
                                    <OpeningScript IVR={IVR} store={appData?.store} language={defineLanguage()} brand={brand} skill={skill} specialStore={specialStore} callID={callID} />
                                    <StoreDetails text={appData?.store?.LandMarks} />
                                    <SpecialNotes text={appData?.store?.Alerts} />
                                </div>
                            </div>
                            {existStore && 
                            <div className={`${css.columnItem} ${css.storeInformation}`}>
                                <StoreInformation store={appData?.store} setTimezone={setTimezone} />
                                {/*doctors={appData?.doctors} rooms={appData?.examRooms} */}
                            </div>  
                            }
                        </div> 
                        : option === MENU_ITEM.DOCTORS ?
                            <DoctorSchedule interceptor={interceptor} storeId={selectedStoreId} />
                        : ''
                        }
                    </div>
            </div>
        )
        )
    }
  
  export default CustomerAcquisition
