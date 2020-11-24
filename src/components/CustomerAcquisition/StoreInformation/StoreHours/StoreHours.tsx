import * as React from 'react'
import { ISchedule } from '../../../interfaces/global'
import css from '../StoreInformation.module.scss'

const StoreHours = (props: ISchedule) => {
    const { schedule } = props
    const slicedTime = schedule.WorkingHourStartTime.slice(0, -3) + ' - ' + schedule.WorkingHourEndTime.slice(0, -3)

    return (
        <div className={css.hourDay}>
            <span className={css.day}>{schedule.Name}</span>
            <span className={css.hours}>{slicedTime && slicedTime === '00:00 - 00:00' ? 'closed' : slicedTime}</span>
        </div>
    )
}

export default StoreHours
