package com.example.expenses.mapper;

import com.example.expenses.dto.AppointmentDto;
import com.example.expenses.model.Appointment;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface AppointmentMapper {

    Appointment toModel(AppointmentDto dto);

    AppointmentDto toDto(Appointment model);
}
