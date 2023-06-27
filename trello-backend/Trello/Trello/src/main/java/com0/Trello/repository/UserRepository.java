package com0.Trello.repository;

import com0.Trello.model.UserSignIn;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<UserSignIn, Integer> {

}
