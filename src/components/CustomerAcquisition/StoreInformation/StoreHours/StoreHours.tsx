import * as React from 'react'
import { ISchedule } from '../../../interfaces/global'
import css from '../StoreInformation.module.scss'

export enum timeZoneNames {
    AST = 'AST',
    EST = 'EST',
    CST = 'CST',
    MST = 'MST',
    PST = 'PST',
}

const formatAMPM = (hoursP: string | undefined) => {
    if (!hoursP) {
      return ''
    }
    if (hoursP == '00:00'){
        return hoursP
    }
    let hours = Number(hoursP.split(':')[0])
    const minutes = Number(hoursP.split(':')[1])
    const ampm = hours >= 12 ? 'PM' : 'AM'
    hours = hours % 12
    hours = hours ? hours : 12 
    const strTime = hours + ':' + (minutes < 10 ? '0' + minutes : minutes) + ' ' + ampm
    return strTime
}

const formatDateLabel = (day: string | number): string => {

    switch (day) {
        case 'Monday':
            return 'Mon'
            break
        case 'Tuesday':
            return 'Tue'
            break
        case 'Wednesday':
            return 'Wed'
            break
        case 'Thursday':
            return 'Thu'
            break
        case 'Friday':
            return 'Fri'
            break
        case 'Saturday':
            return 'Sat'
            break
        case 'Sunday':
            return 'Sun'
            break
        default:
            return ''
            break
    }
}

const getTimezone = (timezone: string) => {
    if (!timezone) {
        return ''
    }

    switch (timezone) {
        case 'ATLANTIC STANDARD TIME':
            return timeZoneNames.AST
            break
        case 'EASTERN STANDARD TIME':
            return timeZoneNames.EST
            break
        case 'CENTRAL STANDARD TIME':
            return timeZoneNames.CST
            break
        case 'MOUNTAIN STANDARD TIME':
            return timeZoneNames.MST
            break
        case 'PACIFIC STANDARD TIME':
            return timeZoneNames.PST
            break
        default:
            return ''
            break
    }
}

const StoreHours = (props: ISchedule) => {
    const { schedule } = props
    let today: Date | number = new Date()
    today = today.getDay()

    const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
    const isToday = days[today] === schedule.Name
    
    const slicedTime = formatAMPM(schedule.WorkingHourStartTime.slice(0, -3)) + ' - ' + formatAMPM(schedule.WorkingHourEndTime.slice(0, -3))

    return (
        <div className={`${css.hourDay} ${isToday ? css.bold : ''}`}>
            <span className={css.day}>{formatDateLabel(schedule.Name)}</span>
            <span className={css.hours}>{slicedTime && slicedTime === '00:00 - 00:00' ? 'Closed' : slicedTime}</span>
            <span className={css.timezone}>{isToday ? getTimezone(schedule.TimeZone): ''}</span>
        </div>
    )
}

export default StoreHours
