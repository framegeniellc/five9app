import * as React from "react"
import css from './DoctorSchedule.module.scss'
import { IDoctorSchedule } from '../interfaces/global'
import { getAvailableTime } from '../../services/zeus/store'


const DoctorSchedule = (props: IDoctorSchedule) => {
    const [doctorHours, setDoctorHours] = React.useState<any>([])
    const [loading, setLoading] = React.useState<boolean>(true)

    const setDoctorAvailability = async () => {
        if (props.storeId !== 0) {
            const availableTime = await getAvailableTime(props.interceptor, props.storeId)

            if(availableTime && availableTime.data?.length > 0) {
                const groupedData = groupByDate(availableTime.data)
                console.log('grouped data', groupedData)
                setDoctorHours(groupedData)
            }

            setLoading(false)
        }
    }

    const groupByDate = (data: any) => {
        return data.reduce( (r: any, a: any) => { 
            r[a.WorkDate] = [...r[a.WorkDate] || [], a]
            return r 
        }, {} );
    }

    React.useEffect(() => {
        setDoctorAvailability()
    }, [])
    
    return (
            <div className={css.doctorContainer}>
                <p> Hello World</p>
                {!loading && <div>{JSON.stringify(doctorHours, null, 4)}</div>
                }
            </div>
            )
    }
  
  export default DoctorSchedule
