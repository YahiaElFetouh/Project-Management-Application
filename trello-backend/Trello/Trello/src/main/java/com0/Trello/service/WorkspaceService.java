package com0.Trello.service;

import com0.Trello.model.Workspace;
import org.springframework.stereotype.Service;

@Service
public interface WorkspaceService {
    Workspace createWorkspace(Workspace workspace);
}
