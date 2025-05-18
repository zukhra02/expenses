package com.example.expenses.controller;

import com.example.expenses.dto.TotalDto;
import com.example.expenses.service.ViewService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/view")
@CrossOrigin(origins = "http://localhost:3000")
public class ViewController {
    private final ViewService viewService;

    @GetMapping("/total")
    public TotalDto getTotal() {
        return viewService.getTotal();
    }
}
