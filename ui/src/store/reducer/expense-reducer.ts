import {ExpenseDto, TotalDto} from "../../types/expense";
import {
    DELETE_EXPENSE,
    GET_ALL_EXPENSES,
    GET_TOTAL,
    HIDE_CREATE_MODAL_SHOW,
    HIDE_DELETE_MODAL_SHOW,
    HIDE_EDIT_MODAL_SHOW,
    SHOW_CREATE_MODAL_SHOW,
    SHOW_DELETE_MODAL_SHOW,
    SHOW_EDIT_MODAL_SHOW,
    UPDATE_EDIT_EXPENSE,
    UPDATE_NEW_EXPENSE,
} from "../action/expense-actions";

type ExpenseReducer = {
    expenses: ExpenseDto[];
    showDeleteModal: boolean;
    expenseToDelete?: ExpenseDto;

    showCreateModal: boolean;
    expenseToCreate?: ExpenseDto;

    showEditModal: boolean;
    expenseToEdit?: ExpenseDto;

    total?: TotalDto;
}

export const expenseReducer = (store = {expenses: [], showDeleteModal: false, showCreateModal: false, showEditModal: false} as ExpenseReducer,
                               action: { type: string; payload: ExpenseReducer; }) => {
    if (action.type === GET_ALL_EXPENSES) {
        return {
            ...store,
            expenses: action.payload.expenses
        }
    } else if (action.type === HIDE_DELETE_MODAL_SHOW) {
        return {
            ...store,
            showDeleteModal: false,
            expenseToDelete: undefined
        }
    } else if (action.type === SHOW_DELETE_MODAL_SHOW) {
        return {
            ...store,
            expenseToDelete: action.payload.expenseToDelete,
            showDeleteModal: true
        }
    } else if (action.type === DELETE_EXPENSE) {
        return {
            ...store,
            showDeleteModal: false,
            expenseToDelete: undefined,
        }
    } else if (action.type === HIDE_CREATE_MODAL_SHOW) {
        return {
            ...store,
            showCreateModal: false,
            expenseToCreate: undefined
        }
    } else if (action.type === SHOW_CREATE_MODAL_SHOW) {
        return {
            ...store,
            expenseToCreate: action.payload.expenseToCreate,
            showCreateModal: true
        }
    } else if (action.type === UPDATE_NEW_EXPENSE) {
        return {
            ...store,
            expenseToCreate: action.payload.expenseToCreate,
        }
    } else if (action.type === HIDE_EDIT_MODAL_SHOW) {
        return {
            ...store,
            showEditModal: false,
            expenseToEdit: undefined
        }
    } else if (action.type === SHOW_EDIT_MODAL_SHOW) {
        return {
            ...store,
            expenseToEdit: action.payload.expenseToEdit,
            showEditModal: true
        }
    } else if (action.type === UPDATE_EDIT_EXPENSE) {
        return {
            ...store,
            expenseToEdit: action.payload.expenseToEdit,
        }
    } else if (action.type === GET_TOTAL) {
        return {
            ...store,
            total: action.payload.total,
        }
    }

    return store;
}
