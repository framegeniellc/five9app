import * as React from "react"
import * as ReactDOM from "react-dom"
import Clock from '../Widgets/Clock/Clock'
import css from './Menu.module.scss'

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
            case 'AST': return 'America/Caracas'
            case 'EST': return 'America/Indiana/Indianapolis'
            case 'CST': return 'America/Chicago'
            case 'MST': return 'America/Denver'
            case 'PST': return 'America/Los_Angeles'
            case 'AKST': return 'America/Anchorage'
            default: return ''
        }
    }

    return (
        <React.Fragment>
            <div className={css.timezone}> 
                <div>
                    { props?.timezone ?
                        <div className={css.timezoneDetail}>
                            {
                                <Clock timezone={getRealTimezone(props?.timezone)}></Clock>
                            }
                            ({props?.timezone})
                        </div>
                    : '' }
                </div>
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