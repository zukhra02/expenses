package com.example.expenses.controller;

import com.example.expenses.dto.AppointmentDto;
import com.example.expenses.mapper.AppointmentMapper;
import com.example.expenses.model.Appointment;
import com.example.expenses.service.AppointmentService;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/appointments")
@CrossOrigin(origins = "http://localhost:3000")
public class AppointmentController {

    private final AppointmentService appointmentService;
    private final AppointmentMapper appointmentMapper;

    @GetMapping
    public List<AppointmentDto> findAll() {
        return appointmentService.findAll().stream()
                .map(appointmentMapper::toDto)
                .toList();
    }

    @GetMapping("/{id}")
    public AppointmentDto findById(@PathVariable @NonNull UUID id) {
        return appointmentMapper.toDto(appointmentService.findById(id));
    }

    @PostMapping
    public AppointmentDto create(@RequestBody AppointmentDto dto) {
        Appointment model = appointmentMapper.toModel(dto);
        return appointmentMapper.toDto(appointmentService.create(model));
    }

    @PutMapping("/{id}")
    public AppointmentDto update(@PathVariable @NonNull UUID id, @RequestBody @NonNull AppointmentDto model) {
        model.setId(id);
        Appointment appointment = appointmentMapper.toModel(model);
        return appointmentMapper.toDto(appointmentService.update(appointment));
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable UUID id) {
        appointmentService.deleteById(id);
    }
}

