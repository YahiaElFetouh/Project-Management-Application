package com0.Trello.service.implementation;

import com0.Trello.model.BoardsModel;
import com0.Trello.repository.BoardsRepository;
import com0.Trello.service.BoardsService;
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

    @Override
    public BoardsModel deleteBoard(long id) throws Exception {
        return null;
    }



}
