
import React from "react";
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
    const [currentDate, setCurrentDate] = useState(new Date());
    const [editingAppointment, setEditingAppointment] = useState<AppointmentDto | null>(null);

    const [formData, setFormData] = useState({
        clientName: "",
        appointmentTime: "",
        description: "",
    });

    const fetchAppointments = async () => {
        try {
            const citas: AppointmentDto[] = await fetch("http://localhost:8080/api/appointments").then(res => res.json());
            setAppointments(citas);

            const eventos: Event[] = citas
                .filter(cita => cita.appointmentDate && cita.appointmentTime)
                .map(cita => {
                    const start = new Date(`${cita.appointmentDate}T${cita.appointmentTime}`);
                    const end = new Date(start.getTime() + 30 * 60000);
                    const hora = start.toLocaleTimeString("es-ES", {
                        hour: "2-digit",
                        minute: "2-digit"
                    });

                    return {
                        title: `${hora} - ${cita.clientName} (${cita.description})`,
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
        setFormData({
            clientName: "",
            appointmentTime: "",
            description: "",
        });
        setEditingAppointment(null);
        setShowModal(true);
    };

    const handleSelectEvent = (event: any) => {
        const cita = appointments.find(c =>
            event.title.includes(c.clientName) &&
            event.start.toISOString().startsWith(c.appointmentDate)
        );
        if (cita) {
            setEditingAppointment(cita);
            setSelectedDate(new Date(`${cita.appointmentDate}T${cita.appointmentTime}`));
            setFormData({
                clientName: cita.clientName,
                appointmentTime: cita.appointmentTime,
                description: cita.description,
            });
            setShowModal(true);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };




        const handleSave = async () => {
            if (!selectedDate) return;

            const formattedDate = selectedDate.toLocaleDateString('sv-SE');

            const newAppointment: AppointmentDto = {
            id: editingAppointment?.id || "", // Nuevo o existente
            clientName: formData.clientName,
            appointmentDate: formattedDate,
            appointmentTime: formData.appointmentTime,
            description: formData.description,
        };

        if (editingAppointment) {
            // update
            await fetch(`http://localhost:8080/api/appointments/${newAppointment.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newAppointment),
            });
        } else {
            // create
            await fetch("http://localhost:8080/api/appointments", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newAppointment),
            });
        }

        setShowModal(false);
        setEditingAppointment(null);
        fetchAppointments();
    };

    const handleDelete = async () => {
        if (!editingAppointment) return;

        await fetch(`http://localhost:8080/api/appointments/${editingAppointment.id}`, {
            method: "DELETE",
        });

        setShowModal(false);
        setEditingAppointment(null);
        fetchAppointments();
    };

    const CustomToolbar = ({ label, onNavigate }: any) => (
        <div className="d-flex justify-content-between align-items-center mb-3">
            {/* Botones izquierda */}
            <div className="d-flex gap-2">
                <button className="btn btn-primary" onClick={() => onNavigate("TODAY")}>Hoy</button>
                <button className="btn btn-primary" onClick={() => onNavigate("PREV")}>Anterior</button>
                <button className="btn btn-primary" onClick={() => onNavigate("NEXT")}>Siguiente</button>
            </div>

            {/* CENTRO (ocupa 100% y alinea al centro) */}
            <div className="flex-grow-1 text-center fw-bold fs-5">
                {label}
            </div>

            {/* Columna vacía con ancho igual a la izquierda */}
            <div style={{ width: "150px" }} />
        </div>
    );

    return (
        <div className="container mt-4">
            <h2>Calendar</h2>

            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                date={currentDate}
                onNavigate={(newDate) => setCurrentDate(newDate)}
                view="month"
                views={["month"]}
                components={{ toolbar: CustomToolbar }}
                style={{ height: 800 }}
                selectable
                onSelectSlot={handleSelectSlot}
                onSelectEvent={handleSelectEvent}
            />

            <Modal show={showModal} onHide={() => {
                setShowModal(false);
                setEditingAppointment(null);
            }}>
                <Modal.Header closeButton>
                    <Modal.Title>{editingAppointment ? "Editar cita" : "Nueva cita"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Nombre del cliente</Form.Label>
                            <Form.Control
                                type="text"
                                name="clientName"
                                value={formData.clientName}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Hora (HH:mm)</Form.Label>
                            <Form.Control
                                type="time"
                                name="appointmentTime"
                                value={formData.appointmentTime}
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
                    {editingAppointment && (
                        <Button variant="danger" onClick={handleDelete}>Eliminar</Button>
                    )}
                    <Button variant="secondary" onClick={() => {
                        setShowModal(false);
                        setEditingAppointment(null);
                    }}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        Guardar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};