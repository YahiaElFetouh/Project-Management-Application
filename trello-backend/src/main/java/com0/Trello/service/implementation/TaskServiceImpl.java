package com0.Trello.service.implementation;

import com0.Trello.model.Task;
import com0.Trello.repository.TaskRepository;
import com0.Trello.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaskServiceImpl implements TaskService {
    @Autowired
    TaskRepository taskRepository;

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
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    @Override
    public Task getTaskById(Integer taskId) {
        Optional<Task> optionalTask = taskRepository.findById(taskId);
        return optionalTask.orElse(null);
    }

    @Override
    public Task saveTask(Task task) {
        return taskRepository.save(task);
    }

}
