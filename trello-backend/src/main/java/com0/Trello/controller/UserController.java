package com0.Trello.controller;

import com0.Trello.model.ResultVO;
import com0.Trello.model.User;
import com0.Trello.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/User")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PatchMapping("/updatePassword/{userId}")
    public User forgotPasswordUser(@PathVariable int userId, @RequestParam String answer, @RequestParam String password) {
        return userService.updatePassword(userId, answer, password);
    }

    @PostMapping("/save")
    public User signupUser(@RequestBody User userModel) throws Exception {
        return userService.signUp(userModel);
    }

    @GetMapping("/fetch")
    public List<User> getAllUsers(){
        return userService.getAllUsers();
    }

    @PostMapping("/login")
    public ResultVO<String> userLogin(@RequestParam String email, @RequestParam String password){
        User userSignIn = new User();
        userSignIn.setEmail(email);
        userSignIn.setPassword(password);
        User result = userService.logIn(userSignIn);
        if (result == null){
            return new ResultVO<String>(5001, "Error!", "Username or Password invalid!");
        }
        else {
            return new ResultVO<>("Login Successful, Welcome!");
        }
    }

}
