package com0.Trello.service;

import com0.Trello.model.BoardsModel;
import com0.Trello.repository.BoardsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BoardsServiceImpl implements BoardsService {
    private final BoardsRepository boardsRepository;

    @Autowired
    public BoardsServiceImpl(BoardsRepository boardsRepository) {
        this.boardsRepository = boardsRepository;
    }

    @Override
    public BoardsModel createBoard(BoardsModel boardsModel) throws Exception {
        return boardsRepository.save(boardsModel);
    }

}
