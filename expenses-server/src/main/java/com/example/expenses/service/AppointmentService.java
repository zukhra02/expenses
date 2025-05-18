package com.example.expenses.service;

import com.example.expenses.model.Appointment;
import com.example.expenses.repository.AppointmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AppointmentService {

    private final AppointmentRepository repository;

    public Appointment create(Appointment appointment) {
        return repository.save(appointment);
    }

    public List<Appointment> findAll() {
        return repository.findAll();
    }

    public void deleteById(UUID id) {
        repository.deleteById(id);
    }
}
