import * as React from "react"
import css from './DoctorSchedule.module.scss'
import { IDoctorSchedule } from '../interfaces/global'


const DoctorSchedule = (props: IDoctorSchedule) => {

    return (
            <div className={css.doctorContainer}>
                <p> Hello World</p>
            </div>
            )
    }
  
  export default DoctorSchedule
