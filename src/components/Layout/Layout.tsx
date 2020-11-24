
import * as React from "react";
import * as ReactDOM from "react-dom";
import css from './Layout.module.scss';
import CustomerAcquisition from '../CustomerAcquisition/CustomerAcquisition'
import Menu from '../Menu/Menu'
import { IGlobalProps } from '../interfaces/global'

interface IState {
    store: number
}

const Layout = (props: IGlobalProps) => {
    const { interceptor, storeId } = props

    return (
        <div className={css.layout}>
            <div className={css.menuContainer}>
                <Menu></Menu>
            </div>
            <div className={css.viewContainer}>
                <CustomerAcquisition interceptor={interceptor} storeId={storeId}></CustomerAcquisition>
            </div>
        </div>
    )
}
    
export default Layout