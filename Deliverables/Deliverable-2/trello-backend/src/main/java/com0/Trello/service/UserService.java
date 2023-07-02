package com0.Trello.service;

import com0.Trello.model.UserModel;

public interface UserService {
    UserModel updatePassword(int userId, String answer, String password);
    public UserSignIn logIn (UserSignIn usrsin);
    public List<UserSignIn> getAllUsers();
    User signUp(User user);


}
