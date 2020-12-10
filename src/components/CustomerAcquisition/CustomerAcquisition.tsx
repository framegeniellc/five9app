import * as React from "react"
import css from '././CustomerAcquisition.module.scss'
import { IGlobalProps } from '../interfaces/global'
import { getEndpointData } from '../../services/zeus/store'
import StoreInformation from './StoreInformation/StoreInformation'
import OpeningScript from './OpeningScript/OpeningScript'
import StoreDetails from './StoreDetails/StoreDetails'
import SpecialNotes from './SpecialNotes/SpecialNotes'
import SearchBox from './SearchBox/SearchBox'
import StoreItem from './SearchBox/StoreItem/StoreItem'
import Error from '../Error/Error'
import Loading from "../Loading/Loading"

const CustomerAcquisition = (props: IGlobalProps) => {
    const { interceptor, storeId, IVR, language, brand, skill} = props
    const [stores, setStores] = React.useState<any>([])
    const [store, setStore] = React.useState<any>([])
    const [doctors, setDoctors] = React.useState<any>([])
    const [examRooms, setExamRooms] = React.useState<any>([])
    const [existStore, setExistsStore] = React.useState<boolean>(false)
    const [loading, setLoading] = React.useState<boolean>(true)
    const [loaded, setLoaded] = React.useState<boolean>(false)
    const [selectedStoreId, setSelectedStoreId] = React.useState<number>(storeId)
    const [geoResponse, setGeoResponse] = React.useState<any>(null)
    const [specialStore, setSpecialStore] = React.useState<boolean>(false)

    const setStoreInfo = async () => {
        const storesData = await getEndpointData(interceptor, null, 'info')
        const storeData = await getEndpointData(interceptor, selectedStoreId, 'info')
        const doctorsData = await getEndpointData(interceptor, selectedStoreId, 'doctors')
        const examRoomsData = await getEndpointData(interceptor, selectedStoreId, 'rooms')

        setDoctors(doctorsData?.data)
        setStore(storeData?.data[0])
        setExamRooms(examRoomsData?.data)
        setStores(storesData?.data)

        if (storeData && storeData.data && storeData.data?.length) {
            setExistsStore(true)   
        }
        setLoading(false)
    }

    const defineLanguage = () => {
        return Number(language) === 2 ? 'es' : 'en'
    }

    const cleanStoreId = (storeId: number) => {

        if(storeId == 958 || storeId == 971 || storeId == 977) {
            setSpecialStore(true)
            storeId = Number(storeId.toString().substring(1))
        }
        
        return storeId
    }

    React.useEffect(() => {
        setLoading(true)
        setSelectedStoreId(cleanStoreId(storeId))
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
                                    <OpeningScript IVR={IVR} store={store} language={defineLanguage()} brand={brand} skill={skill} specialStore={specialStore}/>
                                    <StoreDetails text={store?.StoreDetails} loading={loading} />
                                    <SpecialNotes text={store?.Alerts} loading={loading} />
                                </div>
                            </div>
                            {existStore && 
                            <div className={`${css.columnItem} ${css.storeInformation}`}>
                                <StoreInformation store={store} loading={loading} doctors={doctors} rooms={examRooms} />
                            </div>  
                            }
                        </div> 
                    </div>
            </div>
        )
    )
    }
  
  export default CustomerAcquisition
