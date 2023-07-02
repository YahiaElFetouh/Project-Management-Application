package com0.Trello.controller;


import com0.Trello.model.ResultVO;
import com0.Trello.model.Workspace;
import com0.Trello.service.WorkspaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/workspace")
public class WorkspaceController {
    @Autowired
    private WorkspaceService workspaceService;
    @PostMapping("/createWorkspace")
    public ResultVO<Workspace> createWorkspace(@RequestBody Workspace workspace){
        try {
            Workspace saved = workspaceService.createWorkspace(workspace);
            if (saved == null){
                return new ResultVO<>(40001, "create error!", null);
            }
            return new ResultVO<>(200, "create ok!", saved);
        }catch (Exception e){
            return new ResultVO<>(40001, "create error: " + e.getMessage(), null);
        }
    }
    @PutMapping("/{id}")
    public ResultVO <Workspace> updateWorkSpace(@PathVariable Long id, @RequestBody Workspace workspace){
        return workspaceService.updateWorkspaceDetails(id, workspace);
    }
}
