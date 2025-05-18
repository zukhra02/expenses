import { useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer, Event } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import { es } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Modal, Button, Form } from "react-bootstrap";
import { AppointmentDto } from "../types/appointment";

const locales = { es };
const localizer = dateFnsLocalizer({ format, parse, startOfWeek, getDay, locales });

export const Appointments = () => {
    const [appointments, setAppointments] = useState<AppointmentDto[]>([]);
    const [events, setEvents] = useState<Event[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [formData, setFormData] = useState({
        patientName: "",
        time: "",
        description: "",
    });

    const fetchAppointments = async () => {
        try {
            const citas: AppointmentDto[] = await fetch("http://localhost:8080/api/appointments").then(res => res.json());

            setAppointments(citas);

            const eventos: Event[] = citas.map(cita => {
                const start = new Date(`${cita.date}T${cita.time}`);
                const end = new Date(start.getTime() + 30 * 60000);
                return {
                    title: `${cita.patientName} - ${cita.description}`,
                    start,
                    end,
                };
            });

            setEvents(eventos);
        } catch (error) {
            console.error("Error al cargar citas:", error);
        }
    };

    useEffect(() => {
        fetchAppointments();
    }, []);

    const handleSelectSlot = (slotInfo: any) => {
        setSelectedDate(slotInfo.start);
        setShowModal(true);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        if (!selectedDate) return;

        const newAppointment: AppointmentDto = {
            id: "", // será generado por el backend
            patientName: formData.patientName,
            date: selectedDate.toISOString().split("T")[0],
            time: formData.time,
            description: formData.description,
        };

        await fetch("http://localhost:8080/api/appointments", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newAppointment),
        });

        setShowModal(false);
        setFormData({ patientName: "", time: "", description: "" });
        fetchAppointments();
    };

    return (
        <div className="container mt-4">
            <h2>Calendario de citas</h2>

            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
                selectable
                onSelectSlot={handleSelectSlot}
            />

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Nueva cita</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Nombre del paciente</Form.Label>
                            <Form.Control
                                type="text"
                                name="patientName"
                                value={formData.patientName}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Hora (HH:mm)</Form.Label>
                            <Form.Control
                                type="time"
                                name="time"
                                value={formData.time}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control
                                type="text"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Cancelar</Button>
                    <Button variant="primary" onClick={handleSave}>Guardar</Button>
                </Modal.Footer>
            </Modal>

            <div className="text-center mt-4">
                <Button variant="primary" onClick={fetchAppointments}>Volver</Button>
            </div>
        </div>
    );
};
