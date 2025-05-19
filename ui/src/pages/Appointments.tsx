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

type ViewType = "month" | "week" | "day" | "agenda";

export const Appointments = () => {
    const [appointments, setAppointments] = useState<AppointmentDto[]>([]);
    const [events, setEvents] = useState<Event[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [formData, setFormData] = useState({
        clientName: "",
        appointmentTime: "",
        description: "",
    });
    const [currentDate, setCurrentDate] = useState(new Date());
    const [currentView, setCurrentView] = useState<ViewType>("month");

    const fetchAppointments = async () => {
        try {
            const citas: AppointmentDto[] = await fetch("http://localhost:8080/api/appointments").then(res => res.json());

            setAppointments(citas);

            const eventos: Event[] = citas
                .filter(cita => cita.appointmentDate && cita.appointmentTime)
                .map(cita => {
                    try {
                        const start = new Date(`${cita.appointmentDate}T${cita.appointmentTime}`);
                        const end = new Date(start.getTime() + 30 * 60000);

                        if (isNaN(start.getTime()) || isNaN(end.getTime())) throw new Error("Fecha inválida");

                        return {
                            title: `${cita.clientName} - ${cita.description}`,
                            start,
                            end,
                        };
                    } catch (error) {
                        console.warn("Evento inválido ignorado:", cita);
                        return null;
                    }
                })
                .filter(Boolean) as Event[];

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

        const formattedDate = selectedDate.toISOString().split("T")[0]; // yyyy-MM-dd

        const newAppointment: AppointmentDto = {
            id: "",
            clientName: formData.clientName,
            appointmentDate: formattedDate,
            appointmentTime: formData.appointmentTime,
            description: formData.description,
        };

        await fetch("http://localhost:8080/api/appointments", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newAppointment),
        });

        setShowModal(false);
        setFormData({ clientName: "", appointmentTime: "", description: "" });
        fetchAppointments();
    };

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
                    view={currentView}
                    onView={(view) => {
                    if (["month", "week", "day", "agenda"].includes(view)) {
                    setCurrentView(view as ViewType);
                }
                }}
                    views={["month", "week", "day", "agenda"]}
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
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Cancelar</Button>
                    <Button variant="primary" onClick={handleSave}>Guardar</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};