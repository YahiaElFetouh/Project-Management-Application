package com0.Trello.repository;

import com0.Trello.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskRepository extends JpaRepository<Task, Integer> {
    //Task getTaskById(int boardID);

}
