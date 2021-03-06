import * as React from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'
import { IStoreData, ISchedule, IDoctor, IStatesObject } from '../../interfaces/global'
import StoreHours from './StoreHours/StoreHours'
import Doctor from './Doctor/Doctor'
import statesList from '../../../../static/mock/stateList'
import Loading from '../../Loading/Loading'
import { formatPhoneNumber } from '../Common/store'
import css from './StoreInformation.module.scss'

const StoreInformation = (props: IStoreData) => {
    const [copied, setCopied] = React.useState<boolean>(false)
    const {store, setTimezone} = props

    /*
    const checkRoomCategories = () => {
        const filteredStandardMRS = rooms.map( (item: any, key: any) => {
            if (item.ODStatus === 'MRS' || item.ODStatus === 'Standard') {
                return item.ODStatus
            }
        })

        return filteredStandardMRS.filter((v: any, i: any, a: any) => a.indexOf(v) === i).join('/').slice(0, -1)
    }
    */

    const getShortStateByLong = (longState: string) => {
        const states: IStatesObject = statesList
    
        if (longState?.length == 2) {
          return longState
        }
    
        for (const prop in states) {
          if (states[prop] === longState?.toLowerCase()) return prop.toUpperCase()
        }
    
        return ''
    }

    const getLabStatus = (labStatus: string) => {
        console.log('labStatus', labStatus)
        switch (labStatus) {
            case 'Remote Edge': 
            case 'None': {
                return `Lab: Closed`
            }
        }

        return `Lab: Open`
    }

    const copyText = () => {
        setCopied(true)
        setTimeout( () => {
            setCopied(false)
        }, 2000)
    }

    return (
            <div className={css.storeContainer}>
                <div className={css.storeHeader}>
                    <h2>Store Information</h2>
                </div>
                {store && (<React.Fragment>
                <div className={`${css.iconContainer} ${css.storeName}`}>
                    <i className={`${css.icon} fas fa-store`}></i>
                    <div className={css.inline}>
                        <span>{store?.StoreName}</span>
                    </div>
                    <CopyToClipboard text={`${Number(store?.StoreNumber)}`} onCopy={copyText}>
                        <p className={css.storeNumber}>{`#${Number(store?.StoreNumber)}`}</p> 
                    </CopyToClipboard>
                </div>
                <div className={`${css.iconContainer} ${css.storeAddress}`}>
                    <i className={`${css.icon} fa fa-map-marker-alt`}></i>
                    <div>
                        <span>{store?.Address}</span>
                        <span>{store?.CITY}, {getShortStateByLong(store?.StateName)} {store?.ZipCode}</span>
                    </div>
                </div>
                <div className={`${css.iconContainer} ${css.phoneNumbers}`}>
                    <i className={`${css.icon} fa fa-phone`}></i>
                    <div>
                        {store?.Phones && store.Phones.map( (phone: any, key: any) => {
                            return <div key={key} className={`${css.phone} phone-${phone.Name.toLowerCase()}`}>
                                {phone.Name}: {formatPhoneNumber(phone.PhoneNumber)}
                            </div>
                        } )}
                    </div>
                </div>
                <div className={`${css.iconContainer} ${css.storeHours}`}>
                    <i className={`${css.icon} fa fa-clock`}></i>
                    <div>
                        {store?.Schedules && store?.Schedules.map( (schedule:ISchedule, key: any) => {
                            return <StoreHours schedule={schedule} key={key} />
                        })}
                    </div>
                </div>
                {/*<div className={`${css.iconContainer} ${css.storeLanguages}`}>
                    <i className={`${css.icon} fa fa-globe`}></i>
                   <div><span>{store?.Language}</span></div>
                </div>
                */}
                { 
                /*
                rooms || doctors ? 
                <div className={`${css.iconContainer} ${css.storeMRS}`}>
                    <i className={`${css.icon} fas fa-star-of-life`}></i>
                    <div className={css.odContainer}>
                        <div className={css.title}>OD: {rooms && checkRoomCategories()}</div>
                        <div className={css.doctors}>
                            {doctors && doctors.map( (doctor: IDoctor, key: any) => {
                                if (doctor.FirstName.toLowerCase() !== 'mrs' && doctor.LastName.toLowerCase() !== 'mrs') {
                                    return <Doctor key={key} doctorInfo={doctor} />
                                }
                            })}
                        </div>
                    </div>
                </div>
                : ''
                */}
                <div className={`${css.iconContainer} ${css.storeLab}`}>
                <i className={`${css.icon} fas fa-flask`}></i>
                    <span>{getLabStatus(store?.StoreLabStatus)}</span>
                </div>
                </React.Fragment>)}
            </div>
  
    )
  }
  
  export default StoreInformation