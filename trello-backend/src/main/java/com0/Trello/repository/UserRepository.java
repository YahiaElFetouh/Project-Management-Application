package com0.Trello.repository;

import com0.Trello.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    List<User> findUserSignInByUserNameAndPassword(String username, String password);
    List<User> findUserSignInByEmailAndPassword(String email, String password);
}
