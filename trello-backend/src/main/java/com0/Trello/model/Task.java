package com0.Trello.model;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "Task")
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "task_id", nullable = false)
    private Integer taskId;
    @Column(name = "task_name", nullable = false)
    private String taskName;
    @Column(name = "status", nullable = false)
    private String status;
    @Column(name = "board_id", nullable = false)
    private Integer boardId;
    @Column(name = "due_date", nullable = false)
    private Date due_date;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;


    public Task() {
    }

    public Task(int taskId, String taskName, String status, int boardId) {
        this.taskId = taskId;
        this.taskName = taskName;
        this.status = status;
        this.boardId = boardId;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Integer getTaskId() {
        return taskId;
    }

    public void setTaskName(String taskName) {
        this.taskName = taskName;
    }

    public String getTaskName() {
        return taskName;
    }

    public String getStatus() {
        return status;
    }

    public void setTaskId(Integer taskId) {
        this.taskId = taskId;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setDueDate(Date due_date) {
        this.due_date = due_date;
    }

    public void setBoardId(Integer boardId) {
        this.boardId = boardId;
    }

    public Date getDueDate() {
        return due_date;
    }

    public Integer getBoardId() {
        return boardId;
    }


}

