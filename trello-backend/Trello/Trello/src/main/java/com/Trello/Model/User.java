package com.Trello.Model;

import jakarta.persistence.*;


//JOIN TABLES IN THIS CLASS
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
