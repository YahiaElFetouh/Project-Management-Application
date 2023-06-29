package com0.Trello.repository;

import com0.Trello.model.UserSignIn;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<UserSignIn, Integer> {
    List<UserSignIn> findUserSignInByUserNameAndPassword(String username, String password);
    List<UserSignIn> findUserSignInByEmailAndPassword(String email, String password);
}
