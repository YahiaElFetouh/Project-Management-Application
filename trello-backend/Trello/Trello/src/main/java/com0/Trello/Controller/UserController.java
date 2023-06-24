package com.Trello.Controller;
import com.trello.demo.Service.UserService;
import com.trello.demo.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
        return userService.signUp(user);
    }

    @PutMapping("/assignTask/{userId}")
    public UserModel updateTask(@PathVariable Long userId, @RequestParam Long taskId) {
        return userServiceImpl.updateTask(userId, taskId);
    }


    @PostMapping("/signup")
    public ResponseEntity<String> signUp(@RequestBody User user) {
        try {
            userService.signUp(user);
            return ResponseEntity.ok("User registered successfully");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }


    }

    @PostMapping("/save")
    public UserModel signupUser(@RequestBody UserModel userModel) throws Exception {
        return userServiceImpl.signUpUser(userModel);
    }


}



