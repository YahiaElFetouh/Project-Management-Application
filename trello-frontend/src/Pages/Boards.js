// Boards.js
import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import SearchAndFilter from './searchAndFilter';
//import './Boards.css'; // Assuming you have a separate CSS file for styling

const Boards = () => {
    const [boards, setBoards] = useState([]);
    const [boardTitle, setBoardTitle] = useState('');
    const [tasks, setTasks] = useState({});
    const [taskText, setTaskText] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [sortOption, setSortOption] = useState('newest');
    const [searchText, setSearchText] = useState('');

    const handleCreateBoard = () => {
        if (boardTitle.trim() !== '') {
            setBoards([...boards, boardTitle]);
            setTasks({
                ...tasks,
                [boards.length]: [],
            });
            setBoardTitle('');
        }
    };

    const handleDeleteBoard = (index) => {
        const updatedBoards = boards.filter((_, idx) => idx !== index);
        setBoards(updatedBoards);

        // Also delete tasks associated with this board
        const updatedTasks = { ...tasks };
        delete updatedTasks[index];
        setTasks(updatedTasks);
    };

    const handleAddTask = (index) => {
        if (taskText.trim() !== '') {
            setTasks({
                ...tasks,
                [index]: [
                    ...(tasks[index] || []),
                    {
                        text: taskText,
                        description: taskDescription,
                        createdAt: Date.now(),
                    },
                ],
            });
            setTaskText('');
            setTaskDescription('');
        }
    };

    const handleDeleteTask = (boardIndex, taskIndex) => {
        const updatedTasks = { ...tasks };
        updatedTasks[boardIndex].splice(taskIndex, 1);
        setTasks(updatedTasks);
    };

    const handleEditBoard = (index, newTitle) => {
        const updatedBoards = [...boards];
        updatedBoards[index] = newTitle;
        setBoards(updatedBoards);
    };

    const handleDragEnd = (result) => {
        if (!result.destination) return; // Item was not dropped in a valid drop area

        const { source, destination } = result;

        if (source.droppableId === destination.droppableId) {
            // Reorder tasks in the same board
            const updatedTasks = { ...tasks };
            const boardIndex = Number(source.droppableId);
            const [movedTask] = updatedTasks[boardIndex].splice(source.index, 1);
            updatedTasks[boardIndex].splice(destination.index, 0, movedTask);
            setTasks(updatedTasks);
        } else {
            // Move task to another board
            const sourceBoardIndex = Number(source.droppableId);
            const destBoardIndex = Number(destination.droppableId);

            const updatedTasks = { ...tasks };
            const [movedTask] = updatedTasks[sourceBoardIndex].splice(source.index, 1);
            updatedTasks[destBoardIndex].splice(destination.index, 0, movedTask);
            setTasks(updatedTasks);
        }
    };

    const handleSortChange = (option) => {
        setSortOption(option);
    };

    const handleSearch = (searchText) => {
        setSearchText(searchText);
    };

    const filteredTasks = searchText
        ? [].concat.apply(
            [],
            boards.map((board, boardIndex) =>
                tasks[boardIndex].filter((task) =>
                    task.text.toLowerCase().includes(searchText.toLowerCase())
                )
            )
        )
        : [].concat.apply([], tasks);

    const sortedTasks = [...filteredTasks].sort((task1, task2) => {
        if (sortOption === 'newest') {
            return task2.createdAt - task1.createdAt;
        } else if (sortOption === 'oldest') {
            return task1.createdAt - task2.createdAt;
        } else {
            return task1.text.localeCompare(task2.text);
        }
    });

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <div>
                <div>
                    <SearchAndFilter
                        onSearch={handleSearch}
                        onSortChange={handleSortChange}
                        sortOption={sortOption}
                    />

                    <div>
                        <h2>Create a new board</h2>
                        <input
                            type="text"
                            value={boardTitle}
                            onChange={(e) => setBoardTitle(e.target.value)}
                            placeholder="Enter board title"
                        />
                        <button onClick={handleCreateBoard}>Create Board</button>
                    </div>

                    <div className="boards-list">
                        {boards.map((board, index) => (
                            <Droppable droppableId={index.toString()} key={index}>
                                {(provided) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                        className="board"
                                    >
                                        <input
                                            type="text"
                                            value={board}
                                            onChange={(e) => handleEditBoard(index, e.target.value)}
                                        />
                                        <button onClick={() => handleDeleteBoard(index)}>
                                            Delete Board
                                        </button>
                                        <div>
                                            <input
                                                type="text"
                                                value={taskText}
                                                onChange={(e) => setTaskText(e.target.value)}
                                                placeholder="Enter task"
                                            />
                                            <input
                                                type="text"
                                                value={taskDescription}
                                                onChange={(e) => setTaskDescription(e.target.value)}
                                                placeholder="Enter task description"
                                            />
                                            <button onClick={() => handleAddTask(index)}>
                                                Add Task
                                            </button>
                                        </div>
                                        <Droppable droppableId={`tasks-${index}`} key={`tasks-${index}`}>
                                            {(provided) => (
                                                <ul ref={provided.innerRef} {...provided.droppableProps}>
                                                    {sortedTasks[index] &&
                                                        sortedTasks[index].map((task, taskIndex) => (
                                                            <Draggable
                                                                key={taskIndex}
                                                                draggableId={`task-${index}-${taskIndex}`}
                                                                index={taskIndex}
                                                            >
                                                                {(provided) => (
                                                                    <li
                                                                        ref={provided.innerRef}
                                                                        {...provided.draggableProps}
                                                                        {...provided.dragHandleProps}
                                                                        className="task"
                                                                    >
                                                                        <span>{task.text}</span>
                                                                        {task.description && (
                                                                            <span className="task-description">
                                        {task.description}
                                      </span>
                                                                        )}
                                                                        <button
                                                                            onClick={() =>
                                                                                handleDeleteTask(index, taskIndex)
                                                                            }
                                                                        >
                                                                            Delete Task
                                                                        </button>
                                                                    </li>
                                                                )}
                                                            </Draggable>
                                                        ))}
                                                    {provided.placeholder}
                                                </ul>
                                            )}
                                        </Droppable>
                                    </div>
                                )}
                            </Droppable>
                        ))}
                    </div>
                </div>
            </div>
        </DragDropContext>
    );
};

export default Boards;
