package com0.Trello.repository;

import com0.Trello.model.UserSignIn;
import com0.Trello.model.Workspace;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WorkspaceRepository  extends JpaRepository<Workspace, Integer> {

}
