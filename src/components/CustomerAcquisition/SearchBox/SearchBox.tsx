import * as React from "react";
//import Loading from '../../Loading/Loading'
import { ISearch } from '../../interfaces/global'
//import getEndpointData from '../../../services/zeus/store'
import storesMock from '../../../../static/mock/stores'
import css from './SearchBox.module.scss'

const SearchBox = (props: ISearch) => {
    const { interceptor, setStoreInfo, setSelectedStoreId } = props

    const onKeyPress = (evt: any) => {
        if (evt.key == 'Enter') {
            console.log()
        }
    }

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
                <div className={css.zip}>
                    <input type="number" name="zip" onKeyPress={onKeyPress} maxLength={5} min={10000} max={99999} />
                </div>
            </form>
        </React.Fragment>
    )
  }
  
  export default SearchBox
  