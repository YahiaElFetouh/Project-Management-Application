package com0.Trello.controller;

import com0.Trello.model.UserSignIn;
import com0.Trello.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/UserSignIn")
public class UserController {

    @Autowired
    UserService userService;

    @GetMapping("/fetch")
    public List<UserSignIn> getAllUsers(){
        return userService.getAllUsers();
    }

}
