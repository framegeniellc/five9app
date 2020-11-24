import * as React from "react";
//import Loading from '../../Loading/Loading'
import { ISearch } from '../../interfaces/global'
//import getEndpointData from '../../../services/zeus/store'
import storesMock from '../../../../static/mock/stores'
import css from './SearchBox.module.scss'

const SearchBox = (props: ISearch) => {
    const { interceptor, setStoreInfo, setSelectedStoreId } = props
    /*
    const [loading, setLoading] = React.useState<boolean>(true)

    const setStoreInfo = async () => {
        const store = await getEndpointData(interceptor, null, 'info')

        console.log('stores', store)
        if (store) {
            setStore(store?.data)
        }
        setLoading(false)
    }

    React.useEffect(() => {
        setStoreInfo()
    }, [])

    if (loading) {
        return(<Loading />)
    }
    */
    const onChangeStore = (e: any) => {
        const value = e.target.value
        setSelectedStoreId(value)
        setStoreInfo()
    }
  
    return (
        <React.Fragment>
            <form className={css.searchBox}>
                <select onChange={onChangeStore}>
                    {storesMock.map( (store: any, key: any) => {
                        return (
                            <option key={key} value={store['Store ID']}>{store['Store Name']}</option>
                        )
                    } )}
                </select>
            </form>
        </React.Fragment>
    )
  }
  
  export default SearchBox
  