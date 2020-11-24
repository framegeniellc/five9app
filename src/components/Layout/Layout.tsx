
import * as React from "react";
import * as ReactDOM from "react-dom";
import css from './Layout.module.scss';
import CustomerAcquisition from '../CustomerAcquisition/CustomerAcquisition'
import Menu from '../Menu/Menu'

const Layout = () => {
    return (
        <div className={css.layout}>
            <div className={css.menuContainer}>
                <Menu></Menu>
            </div>
            <div className={css.viewContainer}>
                <CustomerAcquisition></CustomerAcquisition>
            </div>
        </div>
    )
}
    
export default Layout