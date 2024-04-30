package com0.Trello;

import com.fasterxml.jackson.databind.ObjectMapper;
import com0.Trello.model.Task;
import com0.Trello.repository.TaskRepository;
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

import java.util.*;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

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
        Map<String, Object> taskData = new HashMap<>();
        taskData.put("taskId", 33283);
        taskData.put("taskName", "front");
        taskData.put("status", "Completed");
        taskData.put("boardId", 44);

// Convert the Map to a JSON string
        String contents = new ObjectMapper().writeValueAsString(taskData);        mockMvc.perform(MockMvcRequestBuilders
                        .post("/task/createAndChangeTask")
                        .content(contents)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andDo(print());
    }

    @Test
    void createAndChangeTaskFail() throws Exception {
        Map<String, Object> taskData = new HashMap<>();
        taskData.put("taskId", 33283);
        taskData.put("taskName", "front");
        taskData.put("boardId", 44);

// Convert the Map to a JSON string using the ObjectMapper
        String contents = new ObjectMapper().writeValueAsString(taskData);
        mockMvc.perform(MockMvcRequestBuilders
                        .post("/task/createAndChangeTask")
                        .content(contents)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andDo(print());
    }

    @Test
    void createAndChangeTasksOk() throws Exception {
        List<Task> tasks = new ArrayList<>();


        tasks.add(new Task(33283, "front", "Completed", 44));
        tasks.add(new Task(50110, "those", "Completed", 2021));
        tasks.add(new Task(19459, "become", "Pending", 1916));


        String contents = new ObjectMapper().writeValueAsString(tasks);


        mockMvc.perform(MockMvcRequestBuilders
                        .post("/task/createAndChangeTasks")
                        .content(contents)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andDo(print());
    }

    @Test
    void createAndChangeTasksFail() throws Exception {
        List<Task> tasks = new ArrayList<>();

// Create Task objects for each task data and add them to the list
        tasks.add(new Task(33283, "front", null, 44)); // The "status" attribute is optional and set to null
        tasks.add(new Task(50110, null, "Completed", 2021)); // The "taskName" attribute is optional and set to null
        tasks.add(new Task(19459, "become", null, 1916)); // The "status" attribute is optional and set to null



// Use the JSON string in the perform() method
        String contents = new ObjectMapper().writeValueAsString(tasks);

// Use the JSON string in the perform() method
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