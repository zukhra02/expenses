import {Button, Form, Modal, ModalBody, ModalFooter, ModalHeader} from "react-bootstrap";
import {useAppDispatch, useAppSelector} from "../store/store";
import {
    createAppointment,
    getAllAppointments,
    hideCreateModal,
    updateNewAppointment
} from "../store/action/appointment-actions";
import {useCallback} from "react";
import {useForm} from "react-hook-form";
import {AppointmentDto} from "../types/appointment";

export const NewAppointmentModal = () => {
    const dispatch = useAppDispatch();
    const {showCreateModal, newAppointment} = useAppSelector(store => store.appointmentsStore);
    const {handleSubmit} = useForm({mode: "onChange"})

    const onSubmit = useCallback(async () => {
        const response = await dispatch(createAppointment());
        if (response?.ok) {
            await dispatch(getAllAppointments());
            await dispatch(hideCreateModal())
        }
    }, [dispatch])

    const onChange = useCallback((event: any) => {
        const { name, value } = event.target

        const obj = {} as AppointmentDto
        // @ts-ignore
        obj[name] = value;
        dispatch(updateNewAppointment(obj))
    }, [dispatch])
    return (
        <Modal show={showCreateModal} onHide={() => dispatch(hideCreateModal())}>
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
                                value={newAppointment?.description}
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
                                value={newAppointment?.clientName}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Date</Form.Label>
                            <Form.Control
                                type="date"
                                name="appointmentDate"
                                onChange={onChange}
                                value={newAppointment?.appointmentDate}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Time</Form.Label>
                            <Form.Control
                                type="time"
                                name="appointmentTime"
                                onChange={onChange}
                                value={newAppointment?.appointmentTime}
                                required
                            />
                        </Form.Group>
                    </Form.Group>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button variant="secondary" onClick={() => dispatch(hideCreateModal())}>Close</Button>
                <Button onClick={handleSubmit(onSubmit)}>Create</Button>
            </ModalFooter>
        </Modal>
    )
}