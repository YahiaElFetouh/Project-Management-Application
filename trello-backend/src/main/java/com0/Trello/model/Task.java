package com0.Trello.model;

import jakarta.persistence.*;

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

}

