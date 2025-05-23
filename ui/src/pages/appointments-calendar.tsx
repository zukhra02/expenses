import React, {useCallback, useEffect, useMemo, useState} from "react";
import {useAppDispatch, useAppSelector} from "../store/store";
import {getAllAppointments, openEditModal, showCreateModal} from "../store/action/appointment-actions";
// @ts-ignore
import {Calendar, Event, momentLocalizer, Views} from "react-big-calendar";
import moment from 'moment'
import "react-big-calendar/lib/css/react-big-calendar.css";
import {NewAppointmentModal} from "./new-appointment-modal";
import {EditAppointmentModal} from "./edit-appointment-modal";

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
            return {title, start, end, appointment: app} as Event;
        });
    }, [appointments])

    const onView = useCallback((newView: string) => setView(newView), [])
    const onNavigate = useCallback((newDate: any) => {
        setDate(newDate)
    }, [])

    const onSelectSlot = useCallback((slot: any) => {
        const start = slot['start']
        dispatch(showCreateModal(start))
    }, [dispatch])

    const onSelectEvent = useCallback((event: any) => {
        const appointment = event.appointment
        dispatch(openEditModal(appointment))
    }, [])

    return <>
        <NewAppointmentModal/>
        <EditAppointmentModal />

        <div className="container h-100 d-flex flex-column">
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
                    selectable
                    onSelectSlot={onSelectSlot}
                    onSelectEvent={onSelectEvent}
                />
            </div>
        </div>
    </>
};