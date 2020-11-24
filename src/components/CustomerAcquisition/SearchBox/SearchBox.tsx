import * as React from "react";
import Loading from '../../Loading/Loading'
import { ISearch } from '../../interfaces/global'
import getEndpointData from '../../../services/zeus/store'
import css from './SearchBox.module.scss'

const SearchBox = (props: ISearch) => {
    const { interceptor, setStore } = props
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

  
    return (
        <React.Fragment>
            <form className={css.searchBox}>
                <select>
                    <option value="">Search by Store # or Name</option>
                    <option value="">Mishawaka</option>
                    <option value="">Bakersfield</option>
                    <option value="">Little Rock</option>
                </select>
            </form>
        </React.Fragment>
    )
  }
  
  export default SearchBox
  