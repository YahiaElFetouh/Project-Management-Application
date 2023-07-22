package com0.Trello.model;

import jakarta.persistence.*;


//JOIN TABLES IN THIS CLASS
@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String userName;

    private String email;

    private String password;

    private String securityQuestion;

    private String securityAnswer;

    //Might use this code later to join tables


    //table task will have many to many relationship with user table
//    @ManyToMany(targetEntity = Task.class, fetch = FetchType.LAZY, cascade = CascadeType.ALL)
//    @JoinTable(
//            name="task_has_user",
//            joinColumns=
//            @JoinColumn( name="user_id", referencedColumnName="id"),
//            inverseJoinColumns=@JoinColumn(name="task_id", referencedColumnName="id"))
    //table user will have one to many relationship with workspace table
//    @OneToMany(cascade = CascadeType.ALL)
//    @JoinColumn(name = "workspace_id", referencedColumnName = "id")
//    List <Workspace> workspaces;


    public User(String userName, String email, String password,  String securityAnswer, String securityQuestion) {

        this.email = email;
        this.password = password;

        this.securityAnswer = securityAnswer;

    }


    public User() {
    }



    public void setId(Long id) {
        this.id = id;
    }

    @Id
    public Long getId() {
        return id;
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


    public String getSecurityAnswer() {
        return securityAnswer;
    }

    public void setSecurityAnswer(String securityAnswer) {
        this.securityAnswer = securityAnswer;
    }

    public String getUserName() {
        return  userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }



    public String getSecurityQuestion() {
        return  this.securityQuestion;
    }
    public void setSecurityQuestion(String securityQuestion) {
        this.securityQuestion = securityQuestion;
    }
}
