import * as React from "react";
import { ISearch } from '../../interfaces/global'
import { getLocationFromZip } from '../../../services/zeus/store'
import storesMock from '../../../../static/mock/stores'
import css from './SearchBox.module.scss'

const SearchBox = (props: ISearch) => {
    const { setStoreInfo, setSelectedStoreId, setGeoResponse } = props
    const [searchValue, setSearchValue] = React.useState<string>('')

    const onKeyPress = (evt: any) => {
        const value = evt.target.value

        setSearchValue(value)

        if (evt.key == 'Enter') {
            getLocationFromZip(value, setGeoResponse)
        }
    }

    const onChangeStore = (e: any) => {
        const value = e.target.value
        setSelectedStoreId(value)
        setStoreInfo()
    }

    const onChangeHandler = (evt: any) => {
        const value = evt.target.value

        setSearchValue(value)
    }
  
    return (
        <React.Fragment>
            <div className={css.searchBox}>
                <select onChange={onChangeStore}>
                    {storesMock.map( (store: any, key: any) => {
                        return (
                            <option key={key} value={store['Store ID']} className={store['Brand'] === 'SO' ? css.so : css.mel} >#{store['Store ID']} - {store['Store Name']} ({store['Brand']})</option>
                        )
                    } )}
                </select>
                <div className={css.zip}>
                    <input type="text" name="zip" onKeyPress={onKeyPress} onChange={onChangeHandler} value={searchValue} />
                </div>
            </div>
        </React.Fragment>
    )
  }
  
  export default SearchBox
  