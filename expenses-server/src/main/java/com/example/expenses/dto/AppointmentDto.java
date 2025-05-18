package com.example.expenses.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AppointmentDto {
    private UUID id;
    private String patientName;
    private String date;        // Formato: "2025-05-18"
    private String time;        // Formato: "10:30"
    private String description;
}

