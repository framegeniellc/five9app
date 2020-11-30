import * as React from "react"
import Select from 'react-select'
//import Loading from '../../Loading/Loading'
import { ISearch } from '../../interfaces/global'
//import getEndpointData from '../../../services/zeus/store'
import storesMock from '../../../../static/mock/stores'
import css from './SearchBox.module.scss'

const SearchBox = (props: ISearch) => {
    const { interceptor, setStoreInfo, setSelectedStoreId } = props
    const [valueSelect, setValueSelect] = React.useState<string>()

    const onKeyPress = (evt: any) => {
        if (evt.key == 'Enter') {
            console.log()
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

    return (
        <React.Fragment>
            <form className={css.searchBox}>
                <div className={css.select}>
                    <Select options={getOptions()} onChange={onChangeStore} value={valueSelect} /> 
                </div>
                <div className={css.zip}>
                    <input type="number" name="zip" placeholder="Enter Zip Code" onKeyPress={onKeyPress} maxLength={5} min={10000} max={99999} />
                </div>
            </form>
        </React.Fragment>
    )
  }
  
  export default SearchBox
  