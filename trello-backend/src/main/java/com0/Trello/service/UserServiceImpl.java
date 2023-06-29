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
}
