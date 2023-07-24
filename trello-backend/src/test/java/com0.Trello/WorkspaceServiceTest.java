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
class WorkspaceServiceTest {
    @Autowired
    private MockMvc mockMvc;


    @Test
    void createWorkspaceOk() throws Exception {
        String content = "{ \"name\": \"peace\", \"type\": \"movement\", \"description\": \"Leave break enj\"}";
        mockMvc.perform(MockMvcRequestBuilders
                        .post("/workspace/createWorkspace")
                        .content(content)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andDo(print());
    }

    @Test
    void createWorkspaceFail1() throws Exception {
        String contents = "{\"id\": 29974, \"name\": \"peace\", \"description\": \"Leave break enj\"}";
        mockMvc.perform(MockMvcRequestBuilders
                        .post("/workspace/createWorkspace")
                        .content(contents)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                //.andExpect(content().json("{\"code\":40001,\"message\":\"create error!\",\"data\":null}"))
                .andDo(print());
    }

    @Test
    void createWorkspaceFail2() throws Exception {
        String contents = "{\"id\": 40001, \"name\": \"peace\", \"description\": \"Leave break enj\"}";
        mockMvc.perform(MockMvcRequestBuilders
                        .post("/workspace/createWorkspace")
                        .content(contents)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andDo(print());
    }

    @Test
    void createWorkspaceSuccessful() throws Exception {
        String content = "{ \"name\": \"peace\", \"type\": \"movement\", \"description\": \"Leave break enj\"}";
        mockMvc.perform(MockMvcRequestBuilders
                        .post("/workspace/createWorkspace")
                        .content(content)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andDo(print());
    }
}