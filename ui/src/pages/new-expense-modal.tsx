// NewExpenseModal.tsx
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "react-bootstrap";
import { TransactionForm } from "./TransactionForm";
import { useCallback } from "react";
import {
    createExpense,
    getAllExpenses,
    getTotal,
    hideCreateModal,
    updateNewExpense
} from "../store/action/expense-actions";
import { useAppDispatch, useAppSelector } from "../store/store";
import { ExpenseDto } from "../types/expense";

export const NewExpenseModal = () => {
    const dispatch = useAppDispatch();
    const { showCreateModal, expenseToCreate } = useAppSelector(store => store.expensesStore);

    const onCreate = useCallback(async () => {
        const response = await dispatch(createExpense());

        if (response?.ok) {
            await dispatch(getAllExpenses());
            await dispatch(getTotal());
            await dispatch(hideCreateModal());
        } else {
            console.error("❌ Error al crear el gasto");
        }
    }, [dispatch]);

    const onChange = useCallback((expense: ExpenseDto) => {
        dispatch(updateNewExpense(expense));
    }, [dispatch]);

    return (
        <Modal show={showCreateModal} onHide={() => dispatch(hideCreateModal())}>
            <ModalHeader closeButton>New Expense</ModalHeader>
            <ModalBody>
                {expenseToCreate && (
                    <TransactionForm onChange={onChange} expense={expenseToCreate} />
                )}
            </ModalBody>
            <ModalFooter>
                <Button variant="secondary" onClick={() => dispatch(hideCreateModal())}>Close</Button>
                <Button onClick={onCreate}>Create</Button>
            </ModalFooter>
        </Modal>
    );
};