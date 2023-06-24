package com.Trello.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String userName;

    private String email;

    private String password;

    private String SecurityQuestion;
    private String SecurityAnswer;

    public User(int id, String userName, String email, String password, String securityQuestion, String securityAnswer) {
        this.id = id;
        this.userName = userName;
        this.email = email;
        this.password = password;
        SecurityQuestion = securityQuestion;
        SecurityAnswer = securityAnswer;
    }

    public User() {
    }

    public void setId(int id) {
        this.id = id;
    }

    @Id
    public int getId() {
        return id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
