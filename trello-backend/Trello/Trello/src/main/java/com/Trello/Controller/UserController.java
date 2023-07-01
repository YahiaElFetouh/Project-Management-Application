package com.Trello.Controller;
import com.Trello.Model.User;
import com.Trello.Service.UserService;
import com.Trello.Service.UserServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/User")
public class UserController {


    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/save")
    public User signupUser(@RequestBody User userModel) throws Exception {
        return userService.signUp(userModel);
    }




}



