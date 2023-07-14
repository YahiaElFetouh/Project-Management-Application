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

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/save")
    public User signupUser(@RequestBody User userModel) throws Exception {
        return userService.signUp(userModel);
    }
}
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
            return new ResultVO<String>(5001, "Error!", "Username or Password invalid!");
        }
        else {
            return new ResultVO<>("Login Successful, Welcome!");
        }
    }

}
