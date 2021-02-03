import * as React from 'react'
import FullCalendar, { compareByFieldSpecs } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import css from './DoctorSchedule.module.scss'
import { IDoctorSchedule } from '../interfaces/global'
import { getAvailableTime, formatDate } from '../../services/zeus/store'
import Loading from '../Loading/Loading'


interface ICalendarDate {
    title: string | null
    start: string | null
    end: string | null
    classNames: string[]
}

interface IStoreDoctorScheduler {
    ADPId: string | null
    FirstName: string
    LastName: string
    Title: string
    WorkDate: string
    ClassName?: string
}

interface IDoctorClass {
    LastName: IStoreDoctorScheduler
    ClassName: string
}

interface ICustomObject {
    [key: string]: string
  }

const DoctorSchedule = (props: IDoctorSchedule) => {
    const [doctorHours, setDoctorHours] = React.useState<any>([])
    const [loading, setLoading] = React.useState<boolean>(true)

    const setDoctorAvailability = async (startInterval: Date) => {
        if (props.storeId !== 0) {
            const availableTime = await getAvailableTime(props.interceptor, props.storeId, startInterval)

            if(availableTime && availableTime.data?.length > 0) {
                const doctors: IStoreDoctorScheduler[] = Array.from(new Set(availableTime.data.map( (x: IStoreDoctorScheduler) => x.LastName)))
                const doctorsClassnames: IDoctorClass[] = getDoctorClass(doctors)
                const groupedData = groupByDate(availableTime.data)
                const calendarDates = getCalendarDates(groupedData, doctorsClassnames)
                setDoctorHours(calendarDates)
            }

            setLoading(false)
        }
    }

    const getDoctorClass = (doctors: IStoreDoctorScheduler[]) => {
        const doctorClass: IDoctorClass[] = []

        doctors.map((doctor: IStoreDoctorScheduler, key: number) => {
            const doctors: IDoctorClass = {
                LastName: doctor,
                ClassName: getClass(key)
            }
            doctorClass.push(doctors)
        })

        return doctorClass
    }

    const getClass = (key: number) => {
        switch (key){
            case 0: return 'blue'
            case 1: return 'green'
            case 2: return 'purple'
            case 3: return 'orange'
            case 4: return 'yellow'
            default: return 'blue'
        }
    }

    const getCalendarDates = (groupedData: any, doctorsClassnames: IDoctorClass[]) => {
        let calendarDates: ICalendarDate[] = []
        let startEnd = []

        for (const d in groupedData) {
            const data = groupedData[`${d}`]
            for (const c in data) {
                let item: IStoreDoctorScheduler = data[c]
                startEnd = getStartEnd(item.WorkDate, item.Title)

                Object.keys(doctorsClassnames).forEach((k: string) => {
                    if (doctorsClassnames[k]?.LastName === item['LastName']) {
                        item['ClassName'] = doctorsClassnames[k]?.ClassName
                    }
                })
                
                let calendarDate: ICalendarDate = {
                    title: `${item['Title']}${showAMPM(startEnd[1])} | ${item['FirstName'].toLowerCase()} ${item['LastName'].toLowerCase()}` || ``,
                    start: `${startEnd[0]}`,
                    end: `${startEnd[1]}`,
                    classNames: [`${item['ClassName']}`]
                }

                calendarDates.push(calendarDate)
            }
        }

        return calendarDates
    }

    const showAMPM = (endTime: string) => {
        let hours = new Date(endTime).getHours()

        if (hours > 12) {
            return 'pm'
        }
        return 'am'    
    }

    const checkHoursMinutes = (time: string[]) => {
        if (time?.length === 1) {
            return '00'
        } 
        
        return time[1]
    }

    const getStartEnd = (workDate: string, title: string) => {
        const parsedDate = formatDate(new Date(workDate))
        const splitedHours = title.split('-')

        const timeStart = checkHoursMinutes(splitedHours[0]?.split(':'))
        const timeEnd = checkHoursMinutes(splitedHours[1]?.split(':'))

        return [`${parsedDate}T${getStartTime(splitedHours[0])}:${timeStart}:00`, `${parsedDate}T${getEndTime(splitedHours[0], splitedHours[1])}:${timeEnd}:00`]
    }

    const getStartTime = (startTime: string) => {
        const startHour = startTime.split(':')

        if( Number(startHour[0]) < 6 )
            return getMilitaryTime(Number(startHour[0]))

        if ( Number(startHour[0]) < 10 ) {
            return `0${Number(startHour[0])}`
        }

        return Number(startHour[0])
    }

    const getEndTime = (startTime: string, endTime: string) => {
        let noonOffsets = []
        const startHour = startTime.split(':')
        const endHour = endTime.split(':')

        for (var i = Number(startHour[0]) + 1; i <= 12; i++) {
            noonOffsets.push(i);
        }

        if( !noonOffsets.includes(Number(endHour[0])) || Number(startHour[0]) < 6 ) {
            return getMilitaryTime(Number(endHour[0]))
        }

        if (Number(endHour[0]) < 10) {
            return `0${Number(endHour[0])}`
        }

        return Number(endHour[0])
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

    function renderEventContent(eventInfo: any) {

        const splitTitle = eventInfo.event.title.split('|')

        return (
          <>
            <div className={eventInfo.event.classNames[0]}>
              <span className={css.hours}>{splitTitle[0]}</span>
              <span className={css.name}>{splitTitle[1]}</span>
            </div>
          </>
        )
    }

    const doRender = async (arg: any) => {
        const d = new Date(arg.startStr)

        setDoctorAvailability(d)
    }

    const delay = (ms: number) => {
        return new Promise(resolve => setTimeout(resolve, ms))
      }

    React.useEffect(() => {
      setDoctorAvailability(new Date())
    }, [])

    return (
            loading ? ( <Loading></Loading>) : (
            <div className={css.doctorContainer}>
                <FullCalendar         
                plugins={[ dayGridPlugin ]}
                initialView="dayGridMonth"
                editable={false}
                selectable={false}
                showNonCurrentDates={false}
                fixedWeekCount={false}
                dayMaxEvents={5}
                eventContent={renderEventContent} 
                handleWindowResize={true}
                height={'700px'}
                events={doctorHours}
                //viewDidMount={doDidMount}
                datesSet={doRender}
                >
                </FullCalendar>
                </div>
            )
        )  
    }
  
  export default DoctorSchedule
