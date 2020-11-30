
import * as React from "react";
import css from './Layout.module.scss';
import CustomerAcquisition from '../CustomerAcquisition/CustomerAcquisition'
import Menu from '../Menu/Menu'
import Loading from "../Loading/Loading";
import { IGlobalProps } from '../interfaces/global'

const Layout = (props: IGlobalProps) => {
    const error = true
    const { interceptor, storeId, IVR } = props

    return (
        <div className={css.layout}>
            <div className={css.menuContainer}>
                <Menu></Menu>
            </div>
            <div className={css.viewContainer}>
                {
                    error ?
                    <CustomerAcquisition interceptor={interceptor} storeId={storeId} IVR={IVR} />
                    : <Loading />
                }
            </div>
        </div>
    )
}
    
export default Layout