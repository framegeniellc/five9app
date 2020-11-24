import * as React from "react";
import * as ReactDOM from "react-dom";

import css from './Menu.module.scss'

/*
export enum MENU_ITEM {
    NONE = '',
    INFO = 'INFO',
    OFFERS = 'OFFERS',
  }
*/

interface IMenu {
    //option: any
}

const Menu = (props: IMenu) => {
  
    return (
        <React.Fragment>
            <nav className={css.menu}>
                <ul>
                    <li>
                        <a href="#">
                            <i className={`${css.icon} fas fa-info-circle`}></i>
                            <span>Info</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
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