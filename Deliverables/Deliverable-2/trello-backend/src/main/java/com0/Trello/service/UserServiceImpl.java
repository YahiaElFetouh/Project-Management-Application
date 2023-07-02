package com0.Trello.service;

import com0.Trello.model.UserModel;
import com0.Trello.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserModel updatePassword(int userId, String userSecurityAnswer, String newPassword) {
        UserModel updatedUser = null;
        Optional<UserModel> user = null;

        try {
            user = userRepository.findById(userId);
            if(user.isPresent()) {
                UserModel userModel = user.get();

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

    @Autowired
    UserRepository UserRepo;
    public UserSignIn logIn(UserSignIn userSignIn) {
        if (userSignIn.getPassword() == null){
            return null;
        }
        if (userSignIn.getEmail() != null){
            List<UserSignIn> results = UserRepo.findUserSignInByEmailAndPassword(userSignIn.getEmail(), userSignIn.getPassword());
            if (results.isEmpty()){
                return null;
            }
            return results.get(0);

        }else if (userSignIn.getUserName() != null){
            List<UserSignIn> results = UserRepo.findUserSignInByUserNameAndPassword(userSignIn.getUserName(), userSignIn.getPassword());
            if (results.isEmpty()){
                return null;
            }
            return results.get(0);
        }else {
            return null;
        }

    }

    @Override
    public List<UserSignIn> getAllUsers() {
        return UserRepo.findAll();
    }
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
