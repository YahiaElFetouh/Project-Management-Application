package com0.Trello.controller;


import com0.Trello.model.ResultVO;
import com0.Trello.model.Task;
import com0.Trello.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;



import java.util.List;

@RestController
@RequestMapping("/task")
public class TaskController {
    @Autowired
    TaskService taskService;

    @Autowired
    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }


    @PostMapping("/createAndChangeTasks")
    public ResultVO<String> createAndChangeTasks(@RequestBody List<Task> tasks){
        System.out.println(tasks);
        boolean res = taskService.createAndChangeTasks(tasks);
        if (res){
            return new ResultVO<>("OK!");
        }else{
            return new ResultVO<>("Fail!");
        }
    }

    @PostMapping("/createAndChangeTask")
    public ResultVO<String> createAndChangeTask(@RequestBody Task task){
        Task res = taskService.createAndChangeTask(task);
        if (res != null){
            return new ResultVO<>("OK!");
        }else{
            return new ResultVO<>("Fail!");
        }
    }

    @GetMapping("/fetch")
    public List<Task> getAllUsers(){
        return taskService.getAllTasks();
    }


    @PostMapping("/{taskId}/assign-member/{userId}")
    public ResponseEntity<Task> assignMemberToTask(@PathVariable Integer taskId, @PathVariable int userId) {
        Task assignedTask = taskService.assignMemberToTask(taskId, userId);
        return ResponseEntity.ok(assignedTask);
    }


}
