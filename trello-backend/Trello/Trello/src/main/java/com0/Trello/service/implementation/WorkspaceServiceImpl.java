package com0.Trello.service.implementation;

import com0.Trello.model.ResultVO;
import com0.Trello.model.Workspace;
import com0.Trello.repository.WorkspaceRepository;
import com0.Trello.service.WorkspaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class WorkspaceServiceImpl implements WorkspaceService {
    @Autowired
    private WorkspaceRepository workspaceRepository;

    @Override
    public Workspace createWorkspace(Workspace workspace) {
        return workspaceRepository.save(workspace);
    }
    public ResultVO<Workspace> updateWorkspaceDetails(Long id, Workspace workspace){
        Optional<Workspace> fetchWorkSpace =  workspaceRepository.findById(Math.toIntExact(id));
        if(!fetchWorkSpace.isPresent()){
            return new ResultVO(404, "Couldn't find workspace", null );
        }
        Workspace foundWorkSpace = fetchWorkSpace.get();
        foundWorkSpace.setName(workspace.getName());
        foundWorkSpace.setType(workspace.getType());
        foundWorkSpace.setDescription(workspace.getDescription());
        foundWorkSpace = workspaceRepository.save(foundWorkSpace);


       return new ResultVO (200,"Updated succesully", foundWorkSpace);

    }
}
