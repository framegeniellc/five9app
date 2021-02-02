import * as React from "react"
import css from './DoctorSchedule.module.scss'
import { IDoctorSchedule } from '../interfaces/global'
import { getAvailableTime, formatDate } from '../../services/zeus/store'


interface ICalendarDate {
    title: string | null
    start: string | null
    end: string | null
}

interface IStoreDoctorScheduler {
    ADPId: string | null
    FirstName: string
    LastName: string
    Title: string
    WorkDate: string
}

const DoctorSchedule = (props: IDoctorSchedule) => {
    const [doctorHours, setDoctorHours] = React.useState<any>([])
    const [loading, setLoading] = React.useState<boolean>(true)
    const [startInterval, setStartInterval] = React.useState<any>(new Date())

    const setDoctorAvailability = async () => {
        if (props.storeId !== 0) {
            const availableTime = await getAvailableTime(props.interceptor, props.storeId, startInterval)

            if(availableTime && availableTime.data?.length > 0) {
                const groupedData = groupByDate(availableTime.data)
                const calendarDates = getCalendarDates(groupedData)
                setDoctorHours(calendarDates)
            }

            setLoading(false)
        }
    }

    const getCalendarDates = (groupedData: any) => {
        let calendarDates: ICalendarDate[] = []
        let startEnd = []

        for (const d in groupedData) {
            const data = groupedData[`${d}`]
            for (const c in data) {
                let item: IStoreDoctorScheduler = data[c]
                startEnd = getStartEnd(item.WorkDate, item.Title)
                let calendarDate: ICalendarDate = {
                    title: `${item['Title']} ${item['FirstName']} ${item['LastName']}` || ``,
                    start: `${startEnd[0]}`,
                    end: `${startEnd[1]}`
                }

                calendarDates.push(calendarDate)
            }
        }

        return calendarDates
    }

    const getStartEnd = (workDate: string, title: string) => {
        const parsedDate = formatDate(new Date(workDate))
        const splitedHours = title.split('-')

        return [`${parsedDate}T${getStartTime(Number(splitedHours[0]), Number(splitedHours[1]))}:00:00`, `${parsedDate}T${getEndTime(Number(splitedHours[0]), Number(splitedHours[1]))}:00:00`]
    }

    const getStartTime = (startTime: number, endTime: number) => {
        if( startTime < 6 )
            return getMilitaryTime(startTime)

        return startTime
    }

    const getEndTime = (startTime: number, endTime: number) => {
        let noonOffsets = []

        for (var i = startTime + 1; i <= 12; i++) {
            noonOffsets.push(i);
        }

        if( !noonOffsets.includes(endTime) || startTime < 6 ) {
            return getMilitaryTime(endTime)
        }

        if (endTime < 10) {
            return `0${endTime}`
        }

        return endTime
    }

    const getMilitaryTime = (hour: number) => {
        switch(hour) {
            case 1: { return '13' }
            case 2: { return '14' }
            case 3: { return '15' }
            case 4: { return '16' }
            case 5: { return '17' }
            case 6: { return '18' }
            case 7: { return '19' }
            case 8: { return '20' }
            case 9: { return '21' }
            case 10: { return '22' }
            case 11: { return '23' }
            case 12: { return '00' }
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
