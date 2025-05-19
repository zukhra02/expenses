import React, { useState } from "react";

export interface AppointmentDto {
    id: string;
    clientName: string;
    appointmentDate: string;
    appointmentTime: string;
    description: string;
}

interface Props {
    onCreate: (appointment: AppointmentDto) => void;
}

const NewAppointmentForm: React.FC<Props> = ({ onCreate }) => {
    const [form, setForm] = useState<AppointmentDto>({
        id: "",
        clientName: "",
        appointmentDate: "",
        appointmentTime: "",
        description: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm((prevForm) => ({ ...prevForm, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onCreate(form);
        setForm({
            id: "",
            clientName: "",
            appointmentDate: "",
            appointmentTime: "",
            description: "",
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="clientName"
                value={form.clientName}
                onChange={handleChange}
                placeholder="Nombre del cliente"
                required
            />
            <input
                type="date"
                name="appointmentDate"
                value={form.appointmentDate}
                onChange={handleChange}
                required
            />
            <input
                type="time"
                name="appointmentTime"
                value={form.appointmentTime}
                onChange={handleChange}
                required
            />
            <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Descripción"
                required
            />
            <button type="submit">Crear cita</button>
        </form>
    );
};

export default NewAppointmentForm;