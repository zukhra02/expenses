package com.example.expenses.mapper;

import com.example.expenses.dto.AppointmentDto;
import com.example.expenses.model.Appointment;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.time.LocalDate;
import java.time.LocalTime;

@Mapper(componentModel = "spring")
public interface AppointmentMapper {

    @Mapping(target = "date", expression = "java(LocalDate.parse(dto.getDate()))")
    @Mapping(target = "time", expression = "java(LocalTime.parse(dto.getTime()))")
    Appointment toModel(AppointmentDto dto);

    @Mapping(target = "date", expression = "java(model.getDate().toString())")
    @Mapping(target = "time", expression = "java(model.getTime().toString())")
    AppointmentDto toDto(Appointment model);
}
