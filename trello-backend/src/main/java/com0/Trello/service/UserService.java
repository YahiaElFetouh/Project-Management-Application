package com0.Trello.service;

import com0.Trello.model.User;

import java.util.List;

public interface UserService {

    User signUp(User user);
    User logIn(User userSignIn);
    List<User> getAllUsers();
    User updatePassword(int userId, String userSecurityAnswer, String newPassword);
}
