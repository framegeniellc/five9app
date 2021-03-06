import * as React from "react"
import Select,  { StylesConfig, components }  from 'react-select'
import { ISearch, IStore } from '../../interfaces/global'
import { getLocationFromZip } from '../../../services/zeus/store'
import css from './SearchBox.module.scss'

export enum EStoreBrand {
    SO = 'Stanton Optical',
    MEL = 'My Eyelab',
}
  
const SearchBox = (props: ISearch) => {
    const { setStoreInfo, setSelectedStoreId, setGeoResponse, stores, store } = props
    const [finishSearch, setFinishSearch] = React.useState<boolean>(false)
    const [isLoadingSearch, setIsLoadingSearch] = React.useState<boolean>(false)
    const [searchValue, setSearchValue] = React.useState<string>('')
    const [options, setOptions] = React.useState<Array<any>>([])
    const [defaultStores, setDefaultStores] = React.useState<Array<any>>([])

    React.useEffect(() => {
        setOptions(getOptions(true))
        setDefaultStores(getOptions(true))
    }, [stores])


    const preventNotDesiredCharacters = (e: React.KeyboardEvent) => {
        const keyCode = e.keyCode ? e.keyCode : e.which
        const key = e.which || e.keyCode;
        const ctrl = e.ctrlKey ? e.ctrlKey : ((key === 17) ? true : false);

        if ( key == 67 && ctrl ) {
            document.execCommand('copy');
        }
        
        if (
          keyCode == 8 ||
          keyCode == 9 ||
          keyCode == 46 ||
          keyCode == 37 ||
          keyCode == 39 || 
          keyCode == 17 || 
          keyCode == 86 || 
          ((keyCode >= 48 && keyCode <=57) || (keyCode >= 96 && keyCode <=105))
        ) {
          return true
        } else {
          e.preventDefault()
          return false
        }
    }    

    const startSearch = (value: string) => {
        const text = value || searchValue
        if (text?.length == 5) {
            setIsLoadingSearch(true)
            getLocationFromZip(text, stores, setGeoResponse).then(function() {
                setOptions(getOptions(false))
                setFinishSearch(true)
                setIsLoadingSearch(false)
            })
        } else {
            setOptions(defaultStores)
            setFinishSearch(false)
        }
    }

    const onChangeStore = (selectedOption: any) => {
        const value = selectedOption.value
        setSelectedStoreId(value)
    }

    const onKeyUpHandler = (evt: any) => {
        const value = evt.target.value
        setSearchValue(value)
        startSearch(value)
    }

    const dot = (color = '#ccc') => ({
        alignItems: 'center',
        display: 'flex',
    
        ':before': {
            backgroundColor: 'transparent',
            borderRadius: 10,
            content: '" "',
            display: 'block',
            marginRight: 8,
            height: 5,
            width: 5,
        },
    })
    
    const selectStyle = {
        control: (styles: any, state: any) => {
            return {
              ...styles,
              border: `2px solid ${finishSearch ? 'green' : '#ccc'}`,
              boxShadow: 'none',
              '&:hover': {
                border: `2px solid ${finishSearch ? 'green' : '#ccc'}`,
             }
            };
          },
        input: (styles:any) => ({ ...styles, ...dot() }),
        placeholder: (styles:any) => ({ ...styles, fontSize: '0.9rem', color: '#807e7e', ...dot() }),
        singleValue: (provided: any, state: any) => { const display = "none"; return { ...provided, display }}
    }

    const removeBrand = (storeName: string, brandName: string) => {
        let name = storeName.replace('-', '')

        if (name.includes(EStoreBrand.SO)) {
            name = name.replace(EStoreBrand.SO, '')
        } else if (name.includes(EStoreBrand.MEL)) {
            name = name.replace(EStoreBrand.MEL, '')
        }

        return name.replace('', '')
    }
      

    const getOptions = (order: boolean) => {
        const array: Array<any> = []
        if(stores) {
            if (order) {
                stores.sort((a: IStore, b: IStore) => (a.StoreNumber > b.StoreNumber ? 1 : -1))
            }
            stores.map( (store: any, key: any) => {
                const label: string = '#' + parseInt(store.StoreNumber) + ' - ' + removeBrand(store.StoreName, store.BrandName)
                const value: number = parseInt(store.StoreNumber)
                const color: string = store.BrandName == EStoreBrand.MEL ? '#0082ca' : '#f58220'
                array.push({label: label, value: value, color: color})
            })
        }

        return array
    }

    const DropdownIndicator = (props: any) => {
        return (
            <components.DropdownIndicator {...props}>
                {isLoadingSearch ? <span className={css.loading}><i className="fas fa-spinner"></i></span> : <span className={css.dropdownIcon}><i className="fas fa-sort-down"></i></span>}
            </components.DropdownIndicator>
        )
    }

    const onChangeHandler = (evt: any) => {
        const regex = /^[0-9\b]+$/
        const value = evt.target.value

        if (value === '' || regex.test(value)) {
            setSearchValue(value)
        }       
    }

    const Option = (props: any) => {
        const { data, innerRef, innerProps } = props

        return (
          <div className={css.option} ref={innerRef} {...innerProps}>
            <span className={css.icon} style={{ color: props.data.color }}></span>
            <p>{props?.label}</p>
          </div>
        )
    }

    const onPasteHandler = (evt: any) => {
        const value = evt.clipboardData.getData('Text')
        const regex = /^[0-9\b]+$/

        if (value === '' || regex.test(value)) {
            setSearchValue(value)
            startSearch(value)
        }
    }

    return (
        <React.Fragment>
            <div className={css.searchBox}>
                <div className={css.select}>
                    <Select styles={selectStyle} placeholder="Select Store" options={options} onChange={onChangeStore} components={{ Option, DropdownIndicator}} /> 
                </div>
                <div className={css.zip}>
                    <input type="text" name="zip" onPaste={onPasteHandler} maxLength={5} placeholder="Refine by ZIP Code" onKeyUp={onKeyUpHandler} onChange={onChangeHandler} onKeyDown={preventNotDesiredCharacters} value={searchValue} />
                </div>
            </div>
        </React.Fragment>
    )
  }
  
  export default SearchBox
  
