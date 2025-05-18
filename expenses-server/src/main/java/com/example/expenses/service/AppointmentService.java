package com.example.expenses.service;

import com.example.expenses.model.Appointment;
import com.example.expenses.repository.AppointmentRepository;
import com.example.util.CrudUtils;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class AppointmentService {
    private final AppointmentRepository repository;

    public Appointment create(Appointment appointment) {
        appointment.setId(UUID.randomUUID());
        appointment.setNew(true);
        log.info("Creando: {}", appointment); // Opcional: log para debug

        return repository.save(appointment);
    }

    public Appointment findById(@NonNull UUID id) {
        return repository.findById(id).orElseThrow();
    }

    public List<Appointment> findAll() {
        return CrudUtils.findAll(repository);
    }

    public Appointment update(@NonNull Appointment model) {
        return repository.save(model);
    }

    public void deleteById(UUID id) {
        repository.deleteById(id);
    }
}
