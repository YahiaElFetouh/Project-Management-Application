package com0.Trello.controller;

import com0.Trello.model.BoardsModel;
import com0.Trello.service.BoardsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/Boards")
public class BoardsController {

    private final BoardsService boardsService;

    @Autowired
    public BoardsController(BoardsService boardsService) {
        this.boardsService = boardsService;
    }

    @PostMapping("/save")
    public BoardsModel createBoard(@RequestBody BoardsModel boardsModel) throws Exception {
        return boardsService.createBoard(boardsModel);
    }
    @DeleteMapping("/{id}")
    public void deleteBoard(@PathVariable Long id) throws Exception {
        boardsService.deleteBoard(id);
    }


}
