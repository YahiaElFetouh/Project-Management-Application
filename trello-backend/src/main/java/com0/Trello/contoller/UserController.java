package com0.Trello.contoller;

import com0.Trello.model.UserModel;
import com0.Trello.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/User")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PatchMapping("/updatePassword/{userId}")
    public UserModel forgotPasswordUser(@PathVariable int userId, @RequestParam String answer, @RequestParam String password) {
        return userService.updatePassword(userId, answer, password);
    }
}
