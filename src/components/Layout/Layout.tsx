
import * as React from "react";
import css from './Layout.module.scss';
import CustomerAcquisition from '../CustomerAcquisition/CustomerAcquisition'
import Menu from '../Menu/Menu'
//import Error from '../Error/Error'
import Loading from "../Loading/Loading";
import { IGlobalProps } from '../interfaces/global'

const Layout = (props: IGlobalProps) => {
    const error = true
    const { interceptor, storeId } = props

    return (
        <div className={css.layout}>
            <div className={css.menuContainer}>
                <Menu></Menu>
            </div>
            <div className={css.viewContainer}>
                {
                    error ?
                    <CustomerAcquisition interceptor={interceptor} storeId={storeId} />
                    : <Loading />//<Error error='TRY_AGAIN'></Error> 
                }
            </div>
        </div>
    )
}
    
export default Layout