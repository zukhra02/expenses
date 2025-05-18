package com.example.expenses.controller;

import com.example.expenses.dto.AppointmentDto;
import com.example.expenses.mapper.AppointmentMapper;
import com.example.expenses.model.Appointment;
import com.example.expenses.service.AppointmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/appointments")
@CrossOrigin(origins = "http://localhost:3000")
public class AppointmentController {

    private final AppointmentService service;
    private final AppointmentMapper mapper;

    @GetMapping
    public List<AppointmentDto> getAll() {
        return service.findAll().stream()
                .map(mapper::toDto)
                .toList();
    }

    @PostMapping
    public AppointmentDto create(@RequestBody AppointmentDto dto) {
        Appointment model = mapper.toModel(dto);
        return mapper.toDto(service.create(model));
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable UUID id) {
        service.deleteById(id);
    }
}

