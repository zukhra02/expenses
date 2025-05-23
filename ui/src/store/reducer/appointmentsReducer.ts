import { AppointmentDto } from "../../types/appointment";
import {
    DELETE_APPOINTMENT,
    GET_ALL_APPOINTMENTS,
    HIDE_CREATE_MODAL, HIDE_EDIT_MODAL, SAVE_APPOINTMENT,
    SHOW_CREATE_MODAL, SHOW_EDIT_MODAL, UPDATE_APPOINTMENT,
    UPDATE_NEW_APPOINTMENT
} from "../action/appointment-actions";

export interface AppointmentState {
    appointments: AppointmentDto[];
    showCreateModal: boolean;
    newAppointment?: AppointmentDto;
    showEditModal: boolean;
    appointment?: AppointmentDto;
}

const initialState: AppointmentState = {
    appointments: [],

    showCreateModal: false,
    newAppointment: undefined,

    showEditModal: false,
    appointment: undefined
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
        case UPDATE_NEW_APPOINTMENT:
            const newAppointment = state.newAppointment || {}
            return {
                ...state,
                newAppointment: { ...newAppointment, ...action.payload.newAppointment }
            };
        case HIDE_EDIT_MODAL:
            return {
                ...state,
                showEditModal: false,
                appointment: undefined
            };
        case SHOW_EDIT_MODAL:
            return {
                ...state,
                showEditModal: true,
                appointment: action.payload.appointment
            };
        case UPDATE_APPOINTMENT:
            const app = state.appointment || {}
            return {
                ...state,
                appointment: { ...app, ...action.payload.appointment }
            };
        case DELETE_APPOINTMENT:
            return {
                ...state,
                showEditModal: false,
                appointment: undefined
            };
        case SAVE_APPOINTMENT:
            return {
                ...state,
                showEditModal: false,
                appointment: undefined
            };
        default:
            return state;
    }
}