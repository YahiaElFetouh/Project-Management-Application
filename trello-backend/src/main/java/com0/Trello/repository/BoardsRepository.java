package com0.Trello.repository;

import com0.Trello.model.BoardsModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BoardsRepository extends JpaRepository<BoardsModel, Integer> {
   // BoardsModel findByBoardID(int boardID);
}

