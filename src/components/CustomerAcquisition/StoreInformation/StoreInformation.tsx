import * as React from "react";
import { IStoreData, ISchedule, IDoctor } from '../../interfaces/global'
import StoreHours from './StoreHours/StoreHours'
import Doctor from './Doctor/Doctor'
import Loading from '../../Loading/Loading'
import css from './StoreInformation.module.scss'

const StoreInformation = (props: IStoreData) => {
    const {store, loading, doctors, rooms} = props

    if (loading) {
        return (<Loading />)
    }

    const checkRoomCategories = () => {
        const filteredStandardMRS = rooms.map( (item: any, key: any) => {
            if (item.ODStatus === 'MRS' || item.ODStatus === 'Standard') {
                return item.ODStatus
            }
        })

        return filteredStandardMRS.filter((v: any, i: any, a: any) => a.indexOf(v) === i).join('/').slice(0, -1)
    }

    return (

            <div className={css.storeContainer}>
                <div className={css.storeHeader}>
                    <h2>Store Information</h2>
                </div>
                <div className={`${css.iconContainer} ${css.storeName}`}>
                    <i className={`${css.icon} fas fa-map-marker-alt`}></i>
                    <span>{store?.StoreName}</span>
                </div>
                <div className={`${css.iconContainer} ${css.storeAddress}`}>
                    <i className={`${css.icon} fa fa-store`}></i>
                    <div>
                        <span>{store?.Address}</span>
                        <span>{store?.CITY}, {store?.StateName} {store?.ZipCode}</span>
                    </div>
                </div>
                <div className={`${css.iconContainer} ${css.storeAddressInfo}`}>
                    <i className={`${css.icon} fa fa-car`}></i>
                    <div>
                    <span>{store?.StoreDetails}</span>
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
                <div className={`${css.iconContainer} ${css.storeLanguages}`}>
                <i className={`${css.icon} fa fa-globe`}></i>
                    <span>{store?.Language}</span>
                </div>
                <div className={`${css.iconContainer} ${css.storeMRS}`}>
                    <i className={`${css.icon} fas fa-star-of-life`}></i>
                    <div>OD: {rooms && checkRoomCategories()}</div>                    
                </div>
                <div className={css.doctors}>
                    {doctors && doctors.map( (doctor: IDoctor, key: any) => {
                        return <Doctor key={key} doctorInfo={doctor} />
                    })}
                </div>
                <div className={`${css.iconContainer} ${css.storeLab}`}>
                <i className={`${css.icon} fas fa-flask`}></i>
                    <span>{store?.StoreLabStatus === 'None' ? `LabClosed` : `LabOpen`}</span>
                </div>
            </div>
  
    )
  }
  
  export default StoreInformation