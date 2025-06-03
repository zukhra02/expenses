package com.example.expenses.controller;

import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.json.JsonCompareMode;
import org.springframework.test.web.servlet.MockMvc;

import java.nio.charset.StandardCharsets;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@Slf4j
@SpringBootTest
@ActiveProfiles("test")
@AutoConfigureMockMvc
public class ExpenseControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Value("classpath:/responses/ExpenseController_findAll_response.json")
    private Resource findAllResponse;

    @Value("classpath:/responses/ExpenseController_findById_response.json")
    private Resource findByIdResponse;

    @Value("classpath:/responses/ExpenseController_update.json")
    private Resource update;


    @Value("classpath:/responses/ExpenseController_create.json")
    private Resource create;

    @Test
    @Sql(scripts = {"/cleanup.sql", "/init.sql"})
    void testFindAll() throws Exception {
        mockMvc.perform(get("/api/expense"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(content().json(findAllResponse.getContentAsString(StandardCharsets.UTF_8), JsonCompareMode.STRICT));
    }

    @Test
    @Sql(scripts = {"/cleanup.sql", "/init.sql"})
    void testFindById() throws Exception {
        mockMvc.perform(get("/api/expense/ff9ce045-7c40-4b52-a912-1c63fdf9e641"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(content().json(findByIdResponse.getContentAsString(StandardCharsets.UTF_8), JsonCompareMode.STRICT));
    }

    @Test
    @Sql(scripts = {"/cleanup.sql", "/init.sql"})
    void testDeleteById() throws Exception {
        mockMvc.perform(delete("/api/expense/ff9ce045-7c40-4b52-a912-1c63fdf9e641"))
                .andExpect(status().isOk());

        mockMvc.perform(get("/api/expense"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(content().json("[]", JsonCompareMode.STRICT));
    }

    @Test
    @Sql(scripts = {"/cleanup.sql", "/init.sql"})
    void testUpdate() throws Exception {
        mockMvc.perform(put("/api/expense/ff9ce045-7c40-4b52-a912-1c63fdf9e641")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(update.getContentAsString(StandardCharsets.UTF_8)))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(content().json(update.getContentAsString(StandardCharsets.UTF_8), JsonCompareMode.STRICT));
    }

    @Test
    @Sql(scripts = {"/cleanup.sql"})
    void testCreate() throws Exception {
        mockMvc.perform(post("/api/expense")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(create.getContentAsString(StandardCharsets.UTF_8)))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(content().json(create.getContentAsString(StandardCharsets.UTF_8), JsonCompareMode.LENIENT));
    }
}
