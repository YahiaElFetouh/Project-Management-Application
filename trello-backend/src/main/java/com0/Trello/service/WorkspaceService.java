package com0.Trello.service;

import com0.Trello.model.ResultVO;
import com0.Trello.model.Workspace;
import org.springframework.stereotype.Service;


public interface WorkspaceService {
    Workspace createWorkspace(Workspace workspace);
    public ResultVO<Workspace> updateWorkspaceDetails(Long id, Workspace workspace);
}
