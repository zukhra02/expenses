// expense-actions.ts
import { AppDispatch } from "../store";
import { ExpenseDto, TotalDto } from "../../types/expense";

export const GET_ALL_EXPENSES = "GET_ALL_EXPENSES";
export const HIDE_DELETE_MODAL_SHOW = "HIDE_DELETE_MODAL_SHOW";
export const SHOW_DELETE_MODAL_SHOW = "SHOW_DELETE_MODAL_SHOW";
export const DELETE_EXPENSE = "DELETE_EXPENSE";
export const HIDE_CREATE_MODAL_SHOW = "HIDE_CREATE_MODAL_SHOW";
export const SHOW_CREATE_MODAL_SHOW = "SHOW_CREATE_MODAL_SHOW";
export const UPDATE_NEW_EXPENSE = "UPDATE_NEW_EXPENSE";
export const HIDE_EDIT_MODAL_SHOW = "HIDE_EDIT_MODAL_SHOW";
export const SHOW_EDIT_MODAL_SHOW = "SHOW_EDIT_MODAL_SHOW";
export const UPDATE_EDIT_EXPENSE = "UPDATE_EDIT_EXPENSE";
export const GET_TOTAL = "GET_TOTAL";

const DEFAULT_TRANSACTION = {
    createdAt: new Date().toISOString(),
    category: "Work",
    description: "",
    status: "INCOME",
    balance: 0
} as ExpenseDto;

export const getAllExpenses = () => async (dispatch: AppDispatch) => {
    const response = await fetch("http://localhost:8080/api/expense");
    const expenses = await response.json() as ExpenseDto[];
    dispatch({ type: GET_ALL_EXPENSES, payload: { expenses } });
};

export const createExpense = () => async (dispatch: AppDispatch, getState: any) => {
    const { expensesStore } = getState();
    if (expensesStore?.expenseToCreate) {
        try {
            const response = await fetch("http://localhost:8080/api/expense", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(expensesStore.expenseToCreate),
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

export const updateExpense = () => async (dispatch: AppDispatch, getState: any) => {
    const { expensesStore } = getState();
    if (expensesStore?.expenseToEdit?.id) {
        await fetch(`http://localhost:8080/api/expense/${expensesStore.expenseToEdit.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(expensesStore.expenseToEdit),
        });
    }
};

export const deleteExpense = () => async (dispatch: AppDispatch, getState: any) => {
    const { expensesStore } = getState();
    if (expensesStore?.expenseToDelete?.id) {
        const response = await fetch(`http://localhost:8080/api/expense/${expensesStore.expenseToDelete.id}`, {
            method: "DELETE",
        });

        if (response.ok) {
            dispatch({ type: DELETE_EXPENSE, payload: {} });
        }
    }
};

export const hideDeleteModal = () => async (dispatch: AppDispatch) => {
    dispatch({ type: HIDE_DELETE_MODAL_SHOW, payload: {} });
};

export const showDeleteModal = (expense: ExpenseDto) => async (dispatch: AppDispatch) => {
    dispatch({ type: SHOW_DELETE_MODAL_SHOW, payload: { expenseToDelete: expense } });
};

export const hideCreateModal = () => async (dispatch: AppDispatch) => {
    dispatch({ type: HIDE_CREATE_MODAL_SHOW, payload: {} });
};

export const showCreateModal = () => async (dispatch: AppDispatch) => {
    dispatch({ type: SHOW_CREATE_MODAL_SHOW, payload: { expenseToCreate: DEFAULT_TRANSACTION } });
};

export const updateNewExpense = (expense: ExpenseDto) => async (dispatch: AppDispatch) => {
    dispatch({ type: UPDATE_NEW_EXPENSE, payload: { expenseToCreate: expense } });
};

export const hideEditModal = () => async (dispatch: AppDispatch) => {
    dispatch({ type: HIDE_EDIT_MODAL_SHOW, payload: {} });
};

export const showEditModal = (expense: ExpenseDto) => async (dispatch: AppDispatch) => {
    dispatch({ type: SHOW_EDIT_MODAL_SHOW, payload: { expenseToEdit: expense } });
};

export const updateEditExpense = (expense: ExpenseDto) => async (dispatch: AppDispatch) => {
    dispatch({ type: UPDATE_EDIT_EXPENSE, payload: { expenseToEdit: expense } });
};

export const getTotal = () => async (dispatch: AppDispatch) => {
    const response = await fetch("http://localhost:8080/api/view/total");
    const total = await response.json() as TotalDto;
    dispatch({ type: GET_TOTAL, payload: { total } });
};
