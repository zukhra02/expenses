import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import { getTotal } from "../store/action/expense-actions";
import { getAllAppointments } from "../store/action/appointment-actions";
import { AppointmentDto } from "../types/appointment";

export default function Summary() {
    const dispatch = useAppDispatch();
    const { total } = useAppSelector(state => state.expensesStore);
    const { appointments } = useAppSelector(state => state.appointmentsStore);

    const [nextAppointment, setNextAppointment] = useState<AppointmentDto | null>(null);

    useEffect(() => {
        dispatch(getTotal());
        dispatch(getAllAppointments());
    }, [dispatch]);

    useEffect(() => {
        if (appointments.length > 0) {
            const sorted = [...appointments].sort((a, b) => {
                const dateA = new Date(`${a.date}T${a.time}`);
                const dateB = new Date(`${b.date}T${b.time}`);
                return dateA.getTime() - dateB.getTime();
            });
            setNextAppointment(sorted[0]);
        }
    }, [appointments]);

    return (
        <div className="container mt-4">
            <h2 className="text-white mb-3">Resumen general</h2>
            <div className="row">
                <div className="col-md-4">
                    <div className="p-3 rounded bg-info text-white">
                        <h5>Saldo total</h5>
                        <h3>{total?.balance?.toFixed(2)} €</h3>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="p-3 rounded bg-success text-white">
                        <h5>Ingresos</h5>
                        <h3>{total?.income?.toFixed(2)} €</h3>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="p-3 rounded bg-danger text-white">
                        <h5>Gastos</h5>
                        <h3>{total?.outcome?.toFixed(2)} €</h3>
                    </div>
                </div>
            </div>

            {nextAppointment && (
                <div className="mt-4 p-3 bg-light rounded border">
                    <h5>Próxima cita</h5>
                    <p><strong>{nextAppointment.patientName}</strong></p>
                    <p>{nextAppointment.date} a las {nextAppointment.time}</p>
                    <p>{nextAppointment.description}</p>
                </div>
            )}
        </div>
    );
}