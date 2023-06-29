package com0.Trello.model;

import jakarta.persistence.*;

@Entity
public class UserSignIn {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String userName;
    private String email;
    private String password;
    //Getters methods
    public int getId() {
        return id;
    }
    public String getUserName() {
        return userName;
    }
    public String getEmail() {
        return email;
    }
    public String getPassword() {
        return password;
    }

    //setters methods
    public void setId(int id) {
        this.id = id;
    }
    public void setUserName(String userName) {
        this.userName = userName;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    //constructor

    public UserSignIn(int id, String userName, String email, String password) {
        this.id = id;
        this.userName = userName;
        this.email = email;
        this.password = password;
    }
    public UserSignIn(){

    }
}
