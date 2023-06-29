package com0.Trello.service;

import com0.Trello.model.UserSignIn;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UserService {
    public UserSignIn logIn (UserSignIn usrsin);
    public List<UserSignIn> getAllUsers();


}
