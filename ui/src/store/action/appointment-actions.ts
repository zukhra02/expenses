import { AppDispatch } from "../store";
import { AppointmentDto } from "../../types/appointment";

// Tipos de acción
export const GET_ALL_APPOINTMENTS = "GET_ALL_APPOINTMENTS";

// Acción para obtener todas las citas
export const getAllAppointments = () => async (dispatch: AppDispatch) => {
    const response = await fetch("http://localhost:8080/api/appointment");
    const appointments = await response.json() as AppointmentDto[];

    dispatch({
        type: GET_ALL_APPOINTMENTS,
        payload: { appointments }
    });
};