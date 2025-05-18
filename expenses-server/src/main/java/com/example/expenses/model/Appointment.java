package com.example.expenses.model;


import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.UUID;

@Entity
@Data
public class Appointment {

    @Id
    @GeneratedValue
    private UUID id;

    private String patientName;

    private LocalDate date;

    private LocalTime time;

    private String description;
}
