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

        private User user;

        public Task() {
        }

        public User getUser() {
                return user;
        }

        public Integer getTaskId() {
                return taskId;
        }

        public String getTaskName() {
                return taskName;
        }

        public String getStatus() {
                return status;
        }

        public Integer getBoardId() {
                return boardId;
        }

        public void setTaskId(Integer taskId) {
                this.taskId = taskId;
        }

        public void setTaskName(String taskName) {
                this.taskName = taskName;
        }
}
