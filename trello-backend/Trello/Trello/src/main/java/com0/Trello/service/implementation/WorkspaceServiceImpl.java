package com0.Trello.service.implementation;

import com0.Trello.model.Workspace;
import com0.Trello.repository.WorkspaceRepository;
import com0.Trello.service.WorkspaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class WorkspaceServiceImpl implements WorkspaceService {
    @Autowired
    private WorkspaceRepository workspaceRepository;

    @Override
    public Workspace createWorkspace(Workspace workspace) {
        return workspaceRepository.save(workspace);
    }
}
