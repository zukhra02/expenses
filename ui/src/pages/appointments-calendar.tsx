import React, {useCallback, useEffect, useMemo, useState} from "react";
import {useAppDispatch, useAppSelector} from "../store/store";
import {getAllAppointments} from "../store/action/appointment-actions";
// @ts-ignore
import {Calendar, Event, momentLocalizer, Views} from "react-big-calendar";
import moment from 'moment'
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment) // or globalizeLocalizer

export const AppointmentsCalendar = () => {
    const dispatch = useAppDispatch();
    const {appointments} = useAppSelector(store => store.appointmentsStore);
    const [date, setDate] = useState(new Date())
    const [view, setView] = useState(Views.MONTH)

    const onRefresh = useCallback(() => {
        dispatch(getAllAppointments());
    }, [dispatch]);

    useEffect(() => {
        onRefresh();
    }, [onRefresh]);

    const events = useMemo(() => {
        return appointments.map(app => {
            const title = `${app.clientName}: ${app.description}`
            const start = new Date(`${app.appointmentDate}T${app.appointmentTime}`)
            const end = new Date(start.getTime() + 30 * 60000);
            return {title, start, end} as Event;
        });
    }, [appointments])

    const onView = useCallback((newView: string) => setView(newView), [])
    const onNavigate = useCallback((newDate: any) => {
        setDate(newDate)
    }, [])

    return <div className="container h-100 d-flex flex-column">
        <div>
            <h2>Calendar</h2>
        </div>
        <div className='h-100'>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                className="h-100"
                onView={onView}
                view={view}
                date={date}
                onNavigate={onNavigate}
            />
        </div>
    </div>
};