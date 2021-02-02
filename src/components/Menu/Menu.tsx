import * as React from "react"
import * as ReactDOM from "react-dom"
import Clock from '../Widgets/Clock/Clock'
import { IMenu } from '../interfaces/global'
import css from './Menu.module.scss'

export enum MENU_ITEM {
    NONE = '',
    STORE = 'STORE',
    OFFERS = 'OFFERS',
    DOCTORS = 'DOCTORS',
}

const Menu = (props: IMenu) => {
    const { option, timezone, setOption } = props 
    
    const getRealTimezone = (timezone: string) => {
        switch (timezone){
            case 'AST': return 'America/Caracas'
            case 'EST': return 'America/Indiana/Indianapolis'
            case 'CST': return 'America/Chicago'
            case 'MST': return 'America/Denver'
            case 'PST': return 'America/Los_Angeles'
            case 'AKST': return 'America/Anchorage'
            default: return ''
        }
    }

    const updateView = (option: any) => {
        setOption(option)
    }

    return (
        <React.Fragment>
            <div className={css.timezone}> 
                <div>
                    { timezone ?
                        <div className={css.timezoneDetail}>
                            {
                                <Clock timezone={getRealTimezone(timezone)}></Clock>
                            }
                            ({timezone})
                        </div>
                    : '' }
                </div>
            </div>
            <nav className={css.menu}>
                <ul>
                    <li>
                        <a href="#" onClick={() => updateView(MENU_ITEM.STORE)} className={`${option === MENU_ITEM.STORE ? css.active : ''}`}> 
                            <i className={`${css.icon} fas fa-info-circle`}></i>
                            <span>Info</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" onClick={() =>updateView(MENU_ITEM.DOCTORS)} className={`${option === MENU_ITEM.DOCTORS ? css.active : ''}`}> 
                            <i className={`${css.icon} fas fa-user-md`}></i>
                            <span>Doctors</span>
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