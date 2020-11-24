import * as React from "react";
import * as ReactDOM from "react-dom";

import css from './StoreInformation.module.scss'

interface IStoreInformation {
    /*
    name: string,
    addressLine1: string,
    addressLine2: string,
    */
}

const StoreInformation = (props: IStoreInformation) => {
    //const [data, setData] = React.useState<string | undefined>(props.data)
  
    return (

            <div className={css.storeContainer}>
                <div className={css.storeHeader}>
                    <h2>Store Information</h2>
                </div>
                <div className={`${css.iconContainer} ${css.storeName}`}>
                    <i className={`${css.icon} fas fa-map-marker-alt`}></i>
                    <span>Stanton Optical - Mishawaka</span>
                </div>
                <div className={`${css.iconContainer} ${css.storeAddress}`}>
                    <i className={`${css.icon} fa fa-store`}></i>
                    <div>
                        <span>5415 N Main</span>
                        <span>Mishawaka, IN 46545</span>
                    </div>
                </div>
                <div className={`${css.iconContainer} ${css.storeAddressInfo}`}>
                    <i className={`${css.icon} fa fa-car`}></i>
                    <div>
                        <span>We're in the intersection of West Douglas Rd and N Main St
                        next to Chipotle Mexican Grill.</span>
                    </div>
                </div>
                <div className={`${css.iconContainer} ${css.storeHours}`}>
                    <i className={`${css.icon} fa fa-clock`}></i>
                    <div>
                        <div className={css.hourDay}>
                            <span className={css.day}>Sun</span>
                            <span className={css.hours}>CLOSED</span>
                        </div>
                        <div className={css.hourDay}>
                            <span className={css.day}>Mon</span>
                            <span className={css.hours}>11:00 AM - 7:00 PM</span>
                        </div>
                        <div className={css.hourDay}>
                            <span className={css.day}>Tue</span>
                            <span className={css.hours}>11:00 AM - 7:00 PM</span>
                        </div>
                        <div className={css.hourDay}>
                            <span className={css.day}>Wed</span>
                            <span className={css.hours}>11:00 AM - 7:00 PM</span>
                        </div>
                        <div className={css.hourDay}>
                            <span className={css.day}>Thu</span>
                            <span className={css.hours}>11:00 AM - 7:00 PM</span>
                        </div>
                        <div className={css.hourDay}>
                            <span className={css.day}>Fri</span>
                            <span className={css.hours}>11:00 AM - 7:00 PM</span>
                        </div>
                        <div className={css.hourDay}>
                            <span className={css.day}>Sat</span>
                            <span className={css.hours}>11:00 AM - 7:00 PM</span>
                        </div>
                    </div>
                </div>
                <div className={`${css.iconContainer} ${css.storeLanguages}`}>
                <i className={`${css.icon} fa fa-globe`}></i>
                    <span>English</span>
                </div>
                <div className={`${css.iconContainer} ${css.storeMRS}`}>
                <i className={`${css.icon} fas fa-star-of-life`}></i>
                    <span>MRS</span>
                </div>
                <div className={`${css.iconContainer} ${css.storeLab}`}>
                <i className={`${css.icon} fas fa-flask`}></i>
                    <span>LabOpen</span>
                </div>
            </div>
  
    )
  }
  
  export default StoreInformation