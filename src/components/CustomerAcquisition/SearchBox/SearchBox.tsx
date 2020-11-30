import * as React from "react"
import Select from 'react-select'
//import Loading from '../../Loading/Loading'
import { ISearch } from '../../interfaces/global'
//import getEndpointData from '../../../services/zeus/store'
import { getLocationFromZip } from '../../../services/zeus/store'
import storesMock from '../../../../static/mock/stores'
import css from './SearchBox.module.scss'

const SearchBox = (props: ISearch) => {
    const { setStoreInfo, setSelectedStoreId, setGeoResponse } = props
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
        if(storesMock) {
            storesMock.map( (store: any, key: any) => {
                const label = '#'+store['Store ID']+' - '+store['Store Name']
                const value = store['Store ID']
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
  