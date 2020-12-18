import * as React from "react";
import * as ReactDOM from "react-dom";
import css from './Menu.module.scss'
import Clock from 'react-live-clock';

export enum MENU_ITEM {
    NONE = '',
    STORE = 'STORE',
    OFFERS = 'OFFERS',
}

interface IMenu {
    option: any
    timezone: any
}

const Menu = (props: IMenu) => {
    const {option} = props
    
    const getRealTimezone = (timezone: string) => {
        switch (timezone){
            case 'AST': return 'America/Anchorage'
            case 'EST': return 'America/Indiana/Indianapolis'
            case 'CST': return 'America/Chicago'
            case 'MST': return 'America/Denver'
            case 'PST': return 'America/Los_Angeles'
            default: return ''
        }
    }

    return (
        <React.Fragment>
            <div className={css.timezone}> 
                { props?.timezone ?
                    <Clock format={'HH:mm A'} ticking={true} timezone={getRealTimezone(props?.timezone)} />
                : '' }
            </div>
            <nav className={css.menu}>
                <ul>
                    <li>
                        <a href="#" className={`${option === MENU_ITEM.STORE ? css.active : ''}`}> 
                            <i className={`${css.icon} fas fa-info-circle`}></i>
                            <span>Info</span>
                        </a>
                    </li>
                    {/* 
                    <li>
                        <a href="#" className={`${option === MENU_ITEM.OFFERS ? css.active : ''}`}>
                            <i className={`${css.icon} fas fa-tag`}></i>
                            <span>Offers</span>
                        </a>
                    </li>
                    */}

                </ul>
            </nav>
        </React.Fragment>
    )
  }
  
  export default Menu