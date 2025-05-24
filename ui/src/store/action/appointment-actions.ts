import { AppDispatch } from "../store";
import { AppointmentDto } from "../../types/appointment";
import moment from "moment";

// Tipos de acción
export const GET_ALL_APPOINTMENTS = "GET_ALL_APPOINTMENTS";
export const HIDE_CREATE_MODAL = "HIDE_CREATE_MODAL";
export const SHOW_CREATE_MODAL = "SHOW_CREATE_MODAL";
export const UPDATE_NEW_APPOINTMENT = "UPDATE_NEW_APPOINTMENT";

export const HIDE_EDIT_MODAL = "HIDE_EDIT_MODAL";
export const SHOW_EDIT_MODAL = "SHOW_EDIT_MODAL";
export const UPDATE_APPOINTMENT = "UPDATE_APPOINTMENT";
export const DELETE_APPOINTMENT = "DELETE_APPOINTMENT";
export const SAVE_APPOINTMENT = "SAVE_APPOINTMENT";

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
    const m = moment(date).format('YYYY-MM-DD')
    dispatch({ type: SHOW_CREATE_MODAL, payload: { newAppointment: {...DEFAULT_APPOINTMENT, appointmentDate: m} } });
};

export const hideEditModal = () => async (dispatch: AppDispatch) => {
    dispatch({ type: HIDE_EDIT_MODAL, payload: {} });
};

export const openEditModal = (appointment: AppointmentDto) => async (dispatch: AppDispatch) => {
    dispatch({ type: SHOW_EDIT_MODAL, payload: { appointment } });
};

export const updateAppointment = (appointment: AppointmentDto) => async (dispatch: AppDispatch) => {
    dispatch({ type: UPDATE_APPOINTMENT, payload: { appointment } });
};

export const updateNewAppointment = (appointment: AppointmentDto) => async (dispatch: AppDispatch) => {
    dispatch({ type: UPDATE_NEW_APPOINTMENT, payload: { newAppointment: appointment } });
};

export const createAppointment = () => async (dispatch: AppDispatch, getState: any) => {
    const { appointmentsStore } = getState();
    if (appointmentsStore?.newAppointment) {
        try {
            const response = await fetch("http://localhost:8080/api/appointments", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(appointmentsStore?.newAppointment),
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error("❌ Error al crear gasto:", response.status, errorText);
            } else {
                console.log("✅ Gasto creado correctamente");
            }

            return response;
        } catch (error) {
            console.error("❌ Error de red o servidor:", error);
            return null;
        }
    }
};

export const saveAppointment = () => async (dispatch: AppDispatch, getState: any) => {
    const { appointmentsStore } = getState();
    if (appointmentsStore?.appointment?.id) {
        await fetch(`http://localhost:8080/api/appointments/${appointmentsStore.appointment.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(appointmentsStore.appointment),
        });

        dispatch({ type: SAVE_APPOINTMENT, payload: {} });
    }
};

export const deleteAppointment = () => async (dispatch: AppDispatch, getState: any) => {
    const { appointmentsStore } = getState();
    if (appointmentsStore?.appointment?.id) {
        const response = await fetch(`http://localhost:8080/api/appointments/${appointmentsStore.appointment.id}`, {
            method: "DELETE",
        });

        if (response.ok) {
            dispatch({ type: DELETE_APPOINTMENT, payload: {} });
        }
    }
};

