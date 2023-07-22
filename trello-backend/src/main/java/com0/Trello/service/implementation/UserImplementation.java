package com0.Trello.service.implementation;

import com0.Trello.model.User;
import com0.Trello.repository.UserRepository;
import com0.Trello.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserImplementation implements UserService {

    @Autowired
    UserRepository userRepository;

    public UserImplementation(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User logIn(User userSignIn) {
        if (userSignIn.getPassword() == null){
            return null;
        }
        if (userSignIn.getEmail() != null){
            List<User> results = userRepository.findUserSignInByEmailAndPassword(userSignIn.getEmail(), userSignIn.getPassword());
            if (results.isEmpty()){
                return null;
            }
            return results.get(0);

        }else if (userSignIn.getEmail() != null){
            List<User> results = userRepository.findUserSignInByUserNameAndPassword(userSignIn.getEmail(), userSignIn.getPassword());
            if (results.isEmpty()){
                return null;
            }
            return results.get(0);
        }else {
            return null;
        }

    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User updatePassword(int userId, String userSecurityAnswer, String newPassword) {
        User updatedUser = null;
        Optional<User> user = null;

        try {
            user = userRepository.findById(userId);
            if(user.isPresent()) {
                User userModel = user.get();

                System.out.println(userModel.getSecurityQuestion());
                if(userModel.getSecurityAnswer().matches(userSecurityAnswer)) {
                    userModel.setPassword(newPassword);
                }

                updatedUser = userRepository.save(userModel);
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        }

        return updatedUser;
    }

    public User signUp(User user) {
        // Perform password validation
        if (!passwordCheck(user.getPassword())) {
            System.out.println("Invalid password");

        }
        return userRepository.save(user);
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
