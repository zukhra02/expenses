package com.example.expenses;

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

    public List<Appointment> findAll() {
        return repository.findAll();
    }

    public Appointment create(Appointment appointment) {
        return repository.save(appointment);
    }

    public void deleteById(UUID id) {
        repository.deleteById(id);
    }
}
