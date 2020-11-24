import * as React from "react";
import { IStoreLoad, ISchedule } from '../../interfaces/global'
import StoreHours from './StoreHours/StoreHours'
import Loading from '../../Loading/Loading'
import css from './StoreInformation.module.scss'

const StoreInformation = (props: IStoreLoad) => {
    const {store, loading} = props

    if (loading) {
        return (<Loading />)
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
                    <span>MRS</span>
                </div>
                <div className={`${css.iconContainer} ${css.storeLab}`}>
                <i className={`${css.icon} fas fa-flask`}></i>
                    <span>{store?.StoreLabStatus === 'None' ? `LabClosed` : `LabOpen`}</span>
                </div>
            </div>
  
    )
  }
  
  export default StoreInformation