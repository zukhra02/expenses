import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { AppointmentDto } from "../types/appointment";

type Props = {
    onCreate: (appointment: AppointmentDto) => void;
};

export const NewAppointmentForm = ({ onCreate }: Props) => {
    const [form, setForm] = useState<AppointmentDto>({
        id: "",
        patientName: "",
        date: "",
        time: "",
        description: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onCreate(form);
        setForm({ id: "", patientName: "", date: "", time: "", description: "" });
    };

    return (
        <Form onSubmit={handleSubmit} className="mb-4">
            <Form.Group className="mb-3">
                <Form.Label>Patient Name</Form.Label>
                <Form.Control
                    type="text"
                    name="patientName"
                    value={form.patientName}
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Date</Form.Label>
                <Form.Control
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Time</Form.Label>
                <Form.Control
                    type="time"
                    name="time"
                    value={form.time}
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                    as="textarea"
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                />
            </Form.Group>

            <Button type="submit">Add Appointment</Button>
        </Form>
    );
};