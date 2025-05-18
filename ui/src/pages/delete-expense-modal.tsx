import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "react-bootstrap";
import {useAppDispatch, useAppSelector} from "../store/store";
import {deleteExpense, getAllExpenses, getTotal, hideDeleteModal} from "../store/action/expense-actions";
import {useCallback} from "react";






export const DeleteExpenseModal = () => {
    const dispatch = useAppDispatch();
    const {showDeleteModal} = useAppSelector(store => store.expensesStore);

    const onDelete = useCallback(() => {
        dispatch(deleteExpense()).then(res => dispatch(getAllExpenses())).then(res => dispatch(getTotal()));
    }, [dispatch])

    return (
        <Modal show={showDeleteModal} onHide={() => dispatch(hideDeleteModal())}>
            <ModalHeader closeButton>You want to delete an expense!!!</ModalHeader>
            <ModalBody>
                <div>Are you sure???</div>
            </ModalBody>
            <ModalFooter>
                <Button variant="secondary" onClick={() => dispatch(hideDeleteModal())}>Close</Button>
                <Button variant="danger" onClick={onDelete}>Delete</Button>
            </ModalFooter>
        </Modal>
    );
};