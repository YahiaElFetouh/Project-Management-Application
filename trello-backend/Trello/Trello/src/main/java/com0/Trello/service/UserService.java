package com0.Trello.service;

import com0.Trello.model.UserSignIn;
import com0.Trello.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
//IMPLEMENTATION
@Service
public class UserService {

    private final UserRepository userRepo;

    public UserService(UserRepository userRepo) {
        this.userRepo = userRepo;
    }

    public void signUp(UserSignIn user) {
        // Perform password validation
        if (!PasswordCheck(user.getPassword())) {
            System.out.println("Invalid password");
            return;
        }
        return UserRepository.save(user);
    }

    private boolean PasswordCheck(String password) {
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
