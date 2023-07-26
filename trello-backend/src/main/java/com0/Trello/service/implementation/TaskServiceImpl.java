package com0.Trello.service.implementation;

import com0.Trello.model.Task;
import com0.Trello.model.User;
import com0.Trello.repository.TaskRepository;
import com0.Trello.repository.UserRepository;
import com0.Trello.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;

    private final UserRepository userRepository;

    @Autowired
    public TaskServiceImpl(TaskRepository taskRepository, UserRepository userRepository) {
        this.userRepository = userRepository;
        this.taskRepository = taskRepository;
    }

    @Override
    public boolean createAndChangeTasks(List<Task> tasks) {
        try {
            taskRepository.saveAll(tasks);
            return true;
        }catch (Exception e){
            return false;
        }
    }

    @Override
    public Task createAndChangeTask(Task task) {
        try {
            return taskRepository.save(task);
        }catch (Exception e){
            return null;
        }
    }

    @Override
    public Task assignMemberToTask(Integer taskId, int userId) {
        Task task = taskRepository.findById(taskId)
                .orElse(null); // or throw an exception if desired
        User user = userRepository.findById(userId)
                .orElse(null); // or throw an exception if desired

        if (task != null && user != null) {
            task.setUser(user);
            taskRepository.save(task);
        }

        return task;
    }

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

}
