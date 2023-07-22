package com0.Trello.controller;


import com0.Trello.model.ResultVO;
import com0.Trello.model.Task;
import com0.Trello.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/task")
public class TaskController {
    @Autowired
    TaskService taskService;

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

}
