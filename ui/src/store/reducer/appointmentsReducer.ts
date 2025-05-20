import { AppointmentDto } from "../../types/appointment";
import {GET_ALL_APPOINTMENTS, HIDE_CREATE_MODAL, SHOW_CREATE_MODAL} from "../action/appointment-actions";

export interface AppointmentState {
    appointments: AppointmentDto[];
    showCreateModal: boolean;
    newAppointment?: AppointmentDto;
}

const initialState: AppointmentState = {
    appointments: [],

    showCreateModal: false,
    newAppointment: undefined
};

export function appointmentsReducer(state = initialState, action: any): AppointmentState {
    switch (action.type) {
        case GET_ALL_APPOINTMENTS:
            return {
                ...state,
                appointments: action.payload.appointments
            };
        case SHOW_CREATE_MODAL:
            return {
                ...state,
                showCreateModal: true,
                newAppointment: action.payload.newAppointment
            };
        case HIDE_CREATE_MODAL:
            return {
                ...state,
                showCreateModal: false,
                newAppointment: undefined
            };
        default:
            return state;
    }
}