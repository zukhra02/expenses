import { AppDispatch } from "../store";
import { AppointmentDto } from "../../types/appointment";
import {HIDE_CREATE_MODAL_SHOW, SHOW_CREATE_MODAL_SHOW} from "./expense-actions";
import {ExpenseDto} from "../../types/expense";

// Tipos de acción
export const GET_ALL_APPOINTMENTS = "GET_ALL_APPOINTMENTS";
export const HIDE_CREATE_MODAL = "HIDE_CREATE_MODAL";
export const SHOW_CREATE_MODAL = "SHOW_CREATE_MODAL";

const DEFAULT_APPOINTMENT = {
    description: "New appointment",
    appointmentTime: "13:00"
} as AppointmentDto;

// Acción para obtener todas las citas
export const getAllAppointments = () => async (dispatch: AppDispatch) => {
    const response = await fetch("http://localhost:8080/api/appointments");
    const appointments = await response.json() as AppointmentDto[];

    dispatch({
        type: GET_ALL_APPOINTMENTS,
        payload: { appointments }
    });
};

export const hideCreateModal = () => async (dispatch: AppDispatch) => {
    dispatch({ type: HIDE_CREATE_MODAL, payload: {} });
};

export const showCreateModal = (date: string) => async (dispatch: AppDispatch) => {
    dispatch({ type: SHOW_CREATE_MODAL, payload: { newAppointment: {...DEFAULT_APPOINTMENT, appointmentDate: date} } });
};