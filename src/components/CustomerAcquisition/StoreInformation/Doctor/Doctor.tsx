import * as React from 'react'
import { IDoctor } from '../../../interfaces/global'
import css from './Doctor.module.scss'

const Doctor = (props: any) => {
    const { doctorInfo } = props

    return (
        <div className={css.doctors}>
            <div className={css.bullet}>{doctorInfo.FirstName} {doctorInfo.LastName}</div>
            {doctorInfo.Comments && (<div className={css.comments}><p>{doctorInfo.Comments}</p></div>)}
        </div>
    )
}

export default Doctor
