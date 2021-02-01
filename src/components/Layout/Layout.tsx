
import * as React from "react";
import css from './Layout.module.scss';
import CustomerAcquisition from '../CustomerAcquisition/CustomerAcquisition'
import DoctorSchedule from '../Doctors/DoctorSchedule'
import Menu from '../Menu/Menu'
import Loading from '../Loading/Loading'
import Offers from '../Offers/Offers'
import { IGlobalProps } from '../interfaces/global'
import { MENU_ITEM } from '../Menu/Menu'

const Layout = (props: IGlobalProps) => {
    const error: boolean = true
    const [option, setOption] = React.useState<string>(MENU_ITEM.STORE) 
    const [timezone, setTimezone] = React.useState<string>('')  
    const { interceptor, storeId, IVR, brand, skill, language, callID } = props
    const [errorMessage, setErrorMessage] = React.useState<string>('')
   
    const updateTimezone = (time: any) => {
        setTimezone(time)
    }

    return (
        <div className={css.layout}>
            <div className={css.menuContainer}>
                <Menu option={option} timezone={timezone} setOption={setOption}></Menu>
            </div>
            <div className={css.viewContainer}>
                {errorMessage.length ? (<div className={css.errorMessage}>{errorMessage}</div>): ``}
                {
                    //error ?
                    option === MENU_ITEM.OFFERS ?
                    <Offers interceptor={interceptor} storeId={storeId} />
                    : option === MENU_ITEM.STORE ?
                    <CustomerAcquisition {...props} setErrorMessage={setErrorMessage} setTimezone={updateTimezone} />
                    : option === MENU_ITEM.DOCTORS ?
                    <DoctorSchedule />

                    : <Loading />
                }
            </div>
        </div>
    )
}
    
export default Layout