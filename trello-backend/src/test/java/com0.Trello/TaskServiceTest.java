package com0.Trello.test;

import com0.Trello.model.Task;
import com0.Trello.repository.TaskRepository;
import com0.Trello.service.TaskService;
import com0.Trello.service.implementation.TaskServiceImpl;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import com0.Trello.model.User;
import com0.Trello.model.UserModel;
import com0.Trello.repository.UserRepository;
import com0.Trello.service.UserService;
import com0.Trello.service.implementation.UserImplementation;

import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.util.Assert;

import java.util.Date;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest
@AutoConfigureMockMvc
class TaskServiceTest {
    @Autowired
    private MockMvc mockMvc;
    @Mock
    private TaskRepository taskRepository;

    @InjectMocks
    private TaskServiceImpl taskService;

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


        @Test
        public void testSaveTaskWithDueDate() {
            Task task = new Task();
            task.setTaskName("Example Task");
            task.setDueDate(new Date());

            when(taskRepository.save(any(Task.class))).thenReturn(task);

            Task savedTask = taskService.saveTask(task);

            verify(taskRepository, times(1)).save(any(Task.class));

            assertEquals("Example Task", savedTask.getTaskName());
            assertEquals(task.getDueDate(), savedTask.getDueDate());
        }
}