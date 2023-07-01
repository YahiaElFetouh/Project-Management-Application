package com0.Trello.service.implementation;

import com0.Trello.model.UserSignIn;
import com0.Trello.repository.UserRepository;
import com0.Trello.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserImplementation extends UserService {

    @Autowired
    UserRepository UserReposotory;

    public UserImplementation(UserRepository userRepo) {
        super(userRepo);
    }

    public UserSignIn logIn(UserSignIn userSignIn) {
        if (userSignIn.getPassword() == null){
            return null;
        }
        if (userSignIn.getEmail() != null){
            List<UserSignIn> results = UserReposotory.findUserSignInByEmailAndPassword(userSignIn.getEmail(), userSignIn.getPassword());
            if (results.isEmpty()){
                return null;
            }
            return results.get(0);

        }else if (userSignIn.getUserName() != null){
            List<UserSignIn> results = UserReposotory.findUserSignInByUserNameAndPassword(userSignIn.getUserName(), userSignIn.getPassword());
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
        return UserReposotory.findAll();
    }
}
