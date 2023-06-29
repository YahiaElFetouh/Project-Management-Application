package com0.Trello.controller;

import com0.Trello.model.ResultVO;
import com0.Trello.model.UserSignIn;
import com0.Trello.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("/login")
    public ResultVO<String> userLogin(@RequestParam String email, @RequestParam String password){
        UserSignIn userSignIn = new UserSignIn();
        userSignIn.setEmail(email);
        userSignIn.setPassword(password);
        UserSignIn result = userService.logIn(userSignIn);
        if (result == null){
            return new ResultVO<String>(5001, "Error!", "Login Fail!");
        }
        else {
            return new ResultVO<>("Login Success!");
        }
    }

}
