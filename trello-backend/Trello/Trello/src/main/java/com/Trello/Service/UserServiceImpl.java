package com.Trello.Service;


import com.Trello.Model.User;
import com.Trello.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
//IMPLEMENTATION
// This class has a method for Password Validation and Sign Up


@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private final UserRepository userRepo;

    public UserServiceImpl(UserRepository userRepo) {
        this.userRepo = userRepo;
    }

    public User signUp(User user) {
        // Perform password validation
        if (!passwordCheck(user.getPassword())) {
            System.out.println("Invalid password");

        }
        return userRepo.save(user);
    }


    //For the following method, I have used this online source to learn how to write regex expressions
    //https://stackoverflow.com/questions/2370015/regular-expression-for-password-validation
    private boolean passwordCheck(String password) {
        boolean correctPass = true;

        if(password.length()<7){
            System.out.println("Password should be at least 8 characters long");
            return false;

        }
        // At least 1 uppercase character
        if (!password.matches(".*[A-Z].*")) {
            return false;
        }

        // At least 1 lowercase character
        if (!password.matches(".*[a-z].*")) {
            return false;
        }

        // At least 1 number
        if (!password.matches(".*\\d.*")) {
            return false;
        }

        // At least 1 special character
        return password.matches(".*[!@#$%^&*()].*");

    }
}
