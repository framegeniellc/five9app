import * as React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import css from './DoctorSchedule.module.scss'
import { IDoctorSchedule } from '../interfaces/global'


const DoctorSchedule = (props: IDoctorSchedule) => {

    let todayStr = new Date().toISOString().replace(/T.*$/, '')
    let tomorrow = new Date(todayStr + 1).toISOString().replace(/T.*$/, '')

    function renderEventContent(eventInfo: any) {
        return (
          <>
            {console.log(eventInfo.event)}
            <div className={eventInfo.event.classNames[0]}>
              <b>{' '}{eventInfo.event.title}</b>
            </div>
          </>
        )
      }

    return (
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
                //timeZone={'UTC'}
                events={[
                    { 
                        title: 'Dr. Test - 12:00 - 4:00pm', 
                        start: todayStr + 'T12:00:00',
                        end: todayStr + 'T14:00:00',
                        allDay: false,
                        classNames: ['blue'],
                        overlap: true
                    },
                    { 
                        title: 'Dr. Test - 11:00am - 3:00pm', 
                        start: todayStr + 'T11:00:00',
                        end: todayStr + 'T15:00:00',
                        allDay: false,
                        classNames: ['yellow'],
                    },
                    { 
                      title: 'Dr. Test - 9:00 - 10:00am', 
                      start: todayStr + 'T09:00:00',
                      end: todayStr + 'T10:00:00',
                      allDay: false,
                      classNames: ['green'],
                    },
                    { 
                      title: 'Dr. Test - 11:00am - 3:00pm', 
                      start: tomorrow + 'T11:00:00',
                      end: tomorrow + 'T15:00:00',
                      allDay: false,
                      classNames: ['orange'],
                    },
                    { 
                      title: 'Dr. Test - 9:00 - 10:00am', 
                      start: tomorrow + 'T09:00:00',
                      end: tomorrow + 'T10:00:00',
                      allDay: false,
                      classNames: ['blue'],
                    }
                ]}
                >
                </FullCalendar>
            </div>
            )
    }
  
  export default DoctorSchedule
