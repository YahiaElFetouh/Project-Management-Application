package com.Trello.Service;

import com.trello.demo.model.User;

public interface UserInterface {
    User saveUser(User user);
    User findUserById(int id);
    String updateUser(User user);
    String deleteUserById(int id);

}
