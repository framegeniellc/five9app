import * as React from "react"
import Select from 'react-select'
import { ISearch } from '../../interfaces/global'
import { getLocationFromZip } from '../../../services/zeus/store'
import css from './SearchBox.module.scss'

const SearchBox = (props: ISearch) => {
    const { setStoreInfo, setSelectedStoreId, setGeoResponse, stores, store } = props
    const [searchValue, setSearchValue] = React.useState<string>('')
    const [valueSelect, setValueSelect] = React.useState<string>()

    const onKeyPress = (evt: any) => {
        const value = evt.target.value

        setSearchValue(value)

        if (evt.key == 'Enter') {
            getLocationFromZip(value, stores, setGeoResponse)
        }
    }

    const onChangeStore = (selectedOption: any) => {
        const value = selectedOption.value
        setValueSelect(value)
        setSelectedStoreId(value)
        setStoreInfo()
    }

    const onKeyUpHandler = (evt: any) => {
        const value = evt.target.value
        
        if (value.length === 5) {
            getLocationFromZip(value, stores, setGeoResponse)
        }
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

    const getSelectedValue = () => {
        const options = getOptions()
        let selected = null

        selected = options.filter(obj => {
            return obj.value === parseInt(store?.StoreNumber)
        })

        return selected
    }

    const onChangeHandler = (evt: any) => {
        const value = evt.target.value

        setSearchValue(value)
    }

    return (
        <React.Fragment>
            <div className={css.searchBox}>
                <div className={css.select}>
                    <Select options={getOptions()} onChange={onChangeStore} value={getSelectedValue()} /> 
                </div>
                <div className={css.zip}>
                    <input type="text" name="zip" placeholder="Enter Zip Code"  onKeyPress={onKeyPress} onKeyUp={onKeyUpHandler} onChange={onChangeHandler} value={searchValue} />
                </div>
            </div>
        </React.Fragment>
    )
  }
  
  export default SearchBox
  