
import * as React from "react";
import css from './Layout.module.scss';
import CustomerAcquisition from '../CustomerAcquisition/CustomerAcquisition'
import Menu from '../Menu/Menu'
import Loading from '../Loading/Loading'
import Offers from '../Offers/Offers'
import { IGlobalProps } from '../interfaces/global'

const Layout = (props: IGlobalProps) => {
    const error: boolean = true
    const option: string = 'STORE'
    const { interceptor, storeId, IVR, brand, skill, language, callID } = props
    
    return (
        <div className={css.layout}>
            <div className={css.menuContainer}>
                <Menu option={option}></Menu>
            </div>
            <div className={css.viewContainer}>
                {
                    //error ?
                    option === 'OFFER' ?
                    <Offers interceptor={interceptor} storeId={storeId} />
                    : option === 'STORE' ?
                    <CustomerAcquisition {...props} />
                    //interceptor={interceptor} storeId={storeId} IVR={IVR} />
                    : <Loading />
                }
            </div>
        </div>
    )
}
    
export default Layout