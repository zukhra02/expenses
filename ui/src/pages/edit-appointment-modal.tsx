import {Button, Form, Modal, ModalBody, ModalFooter, ModalHeader} from "react-bootstrap";
import {useAppDispatch, useAppSelector} from "../store/store";
import {
    deleteAppointment,
    getAllAppointments,
    hideEditModal, saveAppointment, updateAppointment,
} from "../store/action/appointment-actions";
import {useCallback} from "react";
import {useForm} from "react-hook-form";
import {AppointmentDto} from "../types/appointment";

export const EditAppointmentModal = () => {
    const dispatch = useAppDispatch();
    const {showEditModal, appointment} = useAppSelector(store => store.appointmentsStore);
    const {handleSubmit} = useForm({mode: "onChange"})

    const onSubmit = useCallback(async () => {
        await dispatch(saveAppointment());
        await dispatch(getAllAppointments());
    }, [dispatch])

    const onChange = useCallback((event: any) => {
        const {name, value} = event.target

        const obj = {} as AppointmentDto
        // @ts-ignore
        obj[name] = value;
        dispatch(updateAppointment(obj))
    }, [dispatch])

    const onDelete = useCallback(async () => {
        await dispatch(deleteAppointment());
        await dispatch(getAllAppointments());
    }, [dispatch])
    return (
        <Modal show={showEditModal} onHide={() => dispatch(hideEditModal())}>
            <ModalHeader closeButton>New Appointment</ModalHeader>
            <ModalBody>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Group className="mb-3">
                            <Form.Label>Client Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="description"
                                placeholder="Description"
                                onChange={onChange}
                                value={appointment?.description}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Client Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="clientName"
                                placeholder="Name"
                                onChange={onChange}
                                value={appointment?.clientName}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Date</Form.Label>
                            <Form.Control
                                type="date"
                                name="appointmentDate"
                                onChange={onChange}
                                value={appointment?.appointmentDate}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Time</Form.Label>
                            <Form.Control
                                type="time"
                                name="appointmentTime"
                                onChange={onChange}
                                value={appointment?.appointmentTime}
                                required
                            />
                        </Form.Group>
                    </Form.Group>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button variant="secondary" onClick={() => dispatch(hideEditModal())}>Close</Button>
                <Button variant={"danger"} onClick={onDelete}>Delete</Button>
                <Button onClick={handleSubmit(onSubmit)}>Save</Button>
            </ModalFooter>
        </Modal>
    )
}