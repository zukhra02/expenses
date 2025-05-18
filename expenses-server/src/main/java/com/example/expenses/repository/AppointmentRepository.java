package com.example.expenses.repository;

import com.example.expenses.model.Appointment;
import org.springframework.data.repository.CrudRepository;

import java.util.UUID;

public interface AppointmentRepository extends CrudRepository<Appointment, UUID> {
}
