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
                <div className={`${css.iconContainer} ${css.storeHeader}`}>
                    <h2>Store Information</h2>
                </div>
                <div className={`${css.iconContainer} ${css.storeName}`}>
                    <i className={`${css.icon} fab fab-react`}></i>
                    <span>Stanton Optical - Mishawaka</span>
                </div>
                <div className={`${css.iconContainer} ${css.storeAddress}`}>
                    <i className={css.icon}></i>
                    <div>
                        <span>5415 N Main</span>
                        <span>Mishawaka, IN 46545</span>
                    </div>
                </div>
                <div className={`${css.iconContainer} ${css.storeAddressInfo}`}>
                    <i className={css.icon}></i>
                    <span>We're in the intersection of West Douglas Rd and N Main St, next to Chipotle Mexican Grill.</span>
                </div>
                <div className={`${css.iconContainer} ${css.storeHours}`}>
                    <i className={css.icon}></i>
                    <span>Store Hours</span>
                </div>
                <div className={`${css.iconContainer} ${css.storeLanguages}`}>
                    <i className={css.icon}></i>
                    <span>English</span>
                </div>
                <div className={`${css.iconContainer} ${css.storeMRS}`}>
                    <i className={css.icon}></i>
                    <span>MRS</span>
                </div>
                <div className={`${css.iconContainer} ${css.storeLab}`}>
                    <i className={css.icon}></i>
                    <span>LabOpen</span>
                </div>
            </div>
  
    )
  }
  
  export default StoreInformation