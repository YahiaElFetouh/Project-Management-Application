package com0.Trello.test;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class TaskServiceTest {
    @Autowired
    private MockMvc mockMvc;
    @Test
    void createAndChangeTaskOk() throws Exception {
        String contents = "{\"taskId\": 33283, \"taskName\": \"front\", \"status\": \"Completed\", \"boardId\": 44}";
        mockMvc.perform(MockMvcRequestBuilders
                        .post("/task/createAndChangeTask")
                        .content(contents)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andDo(print());
    }

    @Test
    void createAndChangeTaskFail() throws Exception {
        String contents = "{\"taskId\": 33283, \"taskName\": \"front\", \"boardId\": 44}";
        mockMvc.perform(MockMvcRequestBuilders
                        .post("/task/createAndChangeTask")
                        .content(contents)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andDo(print());
    }

    @Test
    void createAndChangeTasksOk() throws Exception {
        String contents = "[{\"taskId\": 33283, \"taskName\": \"front\", \"status\": \"Completed\", \"boardId\": 44}," +
                "{\"taskId\": 50110, \"taskName\": \"those\", \"status\": \"Completed\", \"boardId\": 2021}," +
                "{\"taskId\": 19459, \"taskName\": \"become\", \"status\": \"Pending\", \"boardId\": 1916}]";
        mockMvc.perform(MockMvcRequestBuilders
                        .post("/task/createAndChangeTasks")
                        .content(contents)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andDo(print());
    }

    @Test
    void createAndChangeTasksFail() throws Exception {
        String contents = "[{\"taskId\": 33283, \"taskName\": \"front\",  \"boardId\": 44}," +
                "{\"taskId\": 50110,  \"status\": \"Completed\", \"boardId\": 2021}," +
                "{\"taskId\": 19459, \"taskName\": \"become\",  \"boardId\": 1916}]";
        mockMvc.perform(MockMvcRequestBuilders
                        .post("/task/createAndChangeTasks")
                        .content(contents)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andDo(print());
    }
}