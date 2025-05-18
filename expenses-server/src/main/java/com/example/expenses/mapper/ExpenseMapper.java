package com.example.expenses.mapper;

import com.example.expenses.dto.ExpenseDto;
import com.example.expenses.model.Expense;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ExpenseMapper {

    @Mapping(target = "description", source = "description")
    @Mapping(target = "createdAt", source = "createdAt")
    ExpenseDto toDto(Expense model);

    @Mapping(target = "description", source = "description")
    @Mapping(target = "createdAt", source = "createdAt")
    Expense toModel(ExpenseDto dto);
}
