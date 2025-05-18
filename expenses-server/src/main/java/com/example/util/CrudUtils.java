package com.example.util;

import com.example.expenses.model.Expense;
import lombok.experimental.UtilityClass;
import org.springframework.data.repository.CrudRepository;

import java.util.ArrayList;
import java.util.List;

@UtilityClass
public class CrudUtils {
    public <T, ID> List<T> findAll(CrudRepository<T, ID> repository) {
        List<T> list = new ArrayList<>();
        for (T object : repository.findAll()) {
            list.add(object);
        }
        return list;
    }
}
