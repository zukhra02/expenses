import { AppointmentDto } from "../../types/appointment";

export interface AppointmentState {
    appointments: AppointmentDto[];
}

const initialState: AppointmentState = {
    appointments: []
};

export const GET_ALL_APPOINTMENTS = "GET_ALL_APPOINTMENTS";

export function appointmentsReducer(state = initialState, action: any): AppointmentState {
    switch (action.type) {
        case GET_ALL_APPOINTMENTS:
            return {
                ...state,
                appointments: Array.isArray(action.payload.appointments) ? action.payload.appointments : []
            };
        default:
            return state;
    }
}