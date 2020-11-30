import * as React from "react"
import Select from 'react-select'
import { ISearch } from '../../interfaces/global'
import { getLocationFromZip } from '../../../services/zeus/store'
import css from './SearchBox.module.scss'

const SearchBox = (props: ISearch) => {
    const { setStoreInfo, setSelectedStoreId, setGeoResponse, stores } = props
    const [searchValue, setSearchValue] = React.useState<string>('')
    const [valueSelect, setValueSelect] = React.useState<string>()

    const onKeyPress = (evt: any) => {
        const value = evt.target.value

        setSearchValue(value)

        if (evt.key == 'Enter') {
            getLocationFromZip(value, setGeoResponse)
        }
    }

    const onChangeStore = (selectedOption: any) => {
        const value = selectedOption.value
        setValueSelect(value)
        setSelectedStoreId(value)
        setStoreInfo()
    }
  
    const getOptions = () => {
        const array: Array<any> = []
        if(stores) {
            stores.map( (store: any, key: any) => {
                const label = '#' + parseInt(store.StoreNumber) + ' - ' + store.StoreName
                const value = parseInt(store.StoreNumber)
                array.push({label: label, value: value})
            })
        }

        return array
    }

    const onChangeHandler = (evt: any) => {
        const value = evt.target.value

        setSearchValue(value)
    }

    return (
        <React.Fragment>
            <div className={css.searchBox}>
                <div className={css.select}>
                    <Select options={getOptions()} onChange={onChangeStore} value={valueSelect} /> 
                </div>
                <div className={css.zip}>
                    <input type="text" name="zip" placeholder="Enter Zip Code"  onKeyPress={onKeyPress} onChange={onChangeHandler} value={searchValue} />
                </div>
            </div>
        </React.Fragment>
    )
  }
  
  export default SearchBox
  