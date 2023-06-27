package com0.Trello.service.implementation;

import com0.Trello.model.UserSignIn;
import com0.Trello.repository.UserRepository;
import com0.Trello.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserImplementation implements UserService {

    @Autowired
    UserRepository UserRepo;
    public UserSignIn logIn(UserSignIn usrLogIn) {
        return UserRepo.save(usrLogIn);
        //return "Login Successfully";

    }

    @Override
    public List<UserSignIn> getAllUsers() {
        return UserRepo.findAll();
    }
}
