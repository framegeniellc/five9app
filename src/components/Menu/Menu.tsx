import * as React from "react";
import * as ReactDOM from "react-dom";

import css from './Menu.module.scss'

export enum MENU_ITEM {
    NONE = '',
    STORE = 'STORE',
    OFFERS = 'OFFERS',
  }

interface IMenu {
    option: any
}

const Menu = (props: IMenu) => {
    const {option} = props
    
    return (
        <React.Fragment>
            <nav className={css.menu}>
                <ul>
                    <li>
                        <a href="#" className={`${option === MENU_ITEM.STORE ? css.active : ''}`}> 
                            <i className={`${css.icon} fas fa-info-circle`}></i>
                            <span>Info</span>
                        </a>
                    </li>
                    <li>
                    <a href="#" className={`${option === MENU_ITEM.OFFERS ? css.active : ''}`}>
                            <i className={`${css.icon} fas fa-tag`}></i>
                            <span>Offers</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </React.Fragment>
    )
  }
  
  export default Menu