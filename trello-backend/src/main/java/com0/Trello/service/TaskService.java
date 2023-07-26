package com0.Trello.service;

import com0.Trello.model.Task;

import java.util.List;


public interface TaskService {
    boolean createAndChangeTasks(List<Task> tasks);
    Task createAndChangeTask(Task task);
    Task assignMemberToTask(Integer taskId, int userId);
    List<Task> getAllTasks();

}
