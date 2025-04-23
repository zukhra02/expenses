package com.example.expenses.mapper;

import com.example.expenses.dto.ExpenseDto;
import com.example.expenses.model.Expense;
import org.mapstruct.Mapper;

/*@Mapper(componentModel = "spring")
public interface ExpenseMapper {
    ExpenseDto toDto(Expense model);

    Expense toModel(ExpenseDto dto);
}*/


import org.mapstruct.Mapping;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ExpenseMapper {

    @Mapping(target = "description", source = "description")
    ExpenseDto toDto(Expense model);

    @Mapping(target = "description", source = "description")
    Expense toModel(ExpenseDto dto);
}
