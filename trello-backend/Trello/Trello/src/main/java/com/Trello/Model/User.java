package com.Trello.Model;

import jakarta.persistence.*;


//JOIN TABLES IN THIS CLASS
@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    private String email;

    private String password;




    private String SecurityAnswer;

    //Might use this code later to join tables


    //table task will have many to many relationship with user table
//    @ManyToMany(targetEntity = Task.class, fetch = FetchType.LAZY, cascade = CascadeType.ALL)
//    @Joable(
//            name="task_has_user",
//            joinColumns=
//            @JoinColumn( name="user_id", referencedColumnName="id"),
//            inverseJoinColumns=@JoinColumn(name="task_id", referencedColumnName="id"))
    //table user will have one to many relationship with workspace table
//    @OneToMany(cascade = CascadeType.ALL)
//    @JoinColumn(name = "workspace_id", referencedColumnName = "id")
//    List <Workspace> workspaces;


    public User( String email, String password,  String securityAnswer) {


        this.email = email;
        this.password = password;

        this.SecurityAnswer = securityAnswer;
    }


    public User() {
    }



    public void setId(Long id) {
        this.id = id;
    }


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
        return SecurityAnswer;
    }

    public void setSecurityAnswer(String securityAnswer) {
        SecurityAnswer = securityAnswer;
    }
}
