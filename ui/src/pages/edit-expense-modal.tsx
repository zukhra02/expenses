import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "react-bootstrap";
import {TransactionForm} from "./TransactionForm";
import {useCallback} from "react";
import {
    getAllExpenses, getTotal,
    hideEditModal,
    updateEditExpense,
    updateExpense,
} from "../store/action/expense-actions";
import {useAppDispatch, useAppSelector} from "../store/store";
import {ExpenseDto} from "../types/expense";

export const EditExpenseModal = () => {
    const dispatch = useAppDispatch();
    const {showEditModal, expenseToEdit} = useAppSelector(store => store.expensesStore);

    const onUpdate = useCallback(() => {
        dispatch(updateExpense()).then(res => dispatch(hideEditModal())).then(res => dispatch(getAllExpenses())).then(res => dispatch(getTotal()))
    }, [dispatch])

    const onChange = useCallback((expense: ExpenseDto) => {
        dispatch(updateEditExpense(expense))
    }, [dispatch])

    return <Modal show={showEditModal} onHide={() => dispatch(hideEditModal())}>
        <ModalHeader closeButton>{"Edit Transaction"}</ModalHeader>
        <ModalBody>
            {expenseToEdit && (
                <TransactionForm onChange={onChange} expense={expenseToEdit}/>
            )}
        </ModalBody>
        <ModalFooter>
            <Button variant="secondary" onClick={() => dispatch(hideEditModal())}>Close</Button>
            <Button onClick={onUpdate}>{"Save"}</Button>
        </ModalFooter>
    </Modal>
}