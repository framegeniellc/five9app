
import * as React from "react";
import * as ReactDOM from "react-dom";
import css from './Layout.module.scss';
import CustomerAcquisition from '../CustomerAcquisition/CustomerAcquisition'
import Menu from '../Menu/Menu'
import Error from '../Error/Error'
import Loading from "../Loading/Loading";

const Layout = () => {
    const error = true
    return (
        <div className={css.layout}>
            <div className={css.menuContainer}>
                <Menu></Menu>
            </div>
            <div className={css.viewContainer}>
                {
                    error ?
                    <CustomerAcquisition></CustomerAcquisition>
                    : <Loading></Loading>//<Error error='TRY_AGAIN'></Error> 
                }
                
            </div>
        </div>
    )
}
    
export default Layout