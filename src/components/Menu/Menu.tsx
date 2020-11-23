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
            <nav>
                <ul>
                    <li>
                        <i></i>
                        <span>Info</span>
                    </li>
                    <li>
                        <i></i>
                        <span>Offers</span>
                    </li>
                </ul>
            </nav>
        </React.Fragment>
    )
  }
  
  export default Menu