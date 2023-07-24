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
class UserServiceTest {
    @Autowired
    private MockMvc mockMvc;
    @Test
    void userLoginSuccess() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders
                        .post("/User/login?email=123@qq.com&password=123456")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andDo(print());
    }

    @Test
    void userLoginFail() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders
                        .post("/User/login?email=123@qq.com")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest())
                .andDo(print());

        mockMvc.perform(MockMvcRequestBuilders
                        .post("/User/login?password=123.c33m")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest())
                .andDo(print());

        mockMvc.perform(MockMvcRequestBuilders
                        .post("/user/login?password=123.c33m")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound())
                .andDo(print());

    }

    @Test
    void userLoginIsNotOK() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders
                        .post("/User/login?email=123.com")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest())
                .andDo(print());

        mockMvc.perform(MockMvcRequestBuilders
                        .post("/User/login?password=123c33m")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest())
                .andDo(print());

        mockMvc.perform(MockMvcRequestBuilders
                        .post("/user/login?password=123c33m")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound())
                .andDo(print());

    }

    @Test
    void userLoginIsNotOKWithError() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders
                        .post("/User/login?email=123.com")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest())
                .andDo(print());

        mockMvc.perform(MockMvcRequestBuilders
                        .post("/User/login?password=asddf?")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest())
                .andDo(print());

        mockMvc.perform(MockMvcRequestBuilders
                        .post("/user/login?password=asddf?")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound())
                .andDo(print());

    }

}