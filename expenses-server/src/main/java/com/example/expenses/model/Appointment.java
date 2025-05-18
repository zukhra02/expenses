package com.example.expenses.model;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.domain.Persistable;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.UUID;

@Data
@Table("appointment")
public class Appointment implements Persistable<UUID> {
    @Column("id")
    @Id
    @NotNull
    private UUID id;

    @NotBlank
    @Column("client_name")
    private String clientName;

    @Column("appointment_date")
    private LocalDate appointmentDate;

    @Column("appointment_time")
    private LocalTime appointmentTime;

    @NotBlank
    @Column("description")
    private String description;

    @Transient
    private boolean isNew;

    @Override
    public boolean isNew() {
        return isNew;
    }
}
