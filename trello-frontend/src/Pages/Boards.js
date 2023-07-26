import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import TaskTable from './TaskTable';
import { Form, InputGroup } from 'react-bootstrap';
import {Table} from "react-bootstrap";

const Boards = () => {
    const [search, setSearch] = useState('');
    const [boards, setBoards] = useState([]);
    const [boardTitle, setBoardTitle] = useState('');
    const [tasks, setTasks] = useState([]);
    const [taskText, setTaskText] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [taskStatus, setTaskStatus] = useState('Todo');
    const [allTasks, setAllTasks] = useState([]); // Add the allTasks state
    const [sortOption, setSortOption] = useState('newest');

    // Helper function to create a new board
    const handleCreateBoard = () => {
        if (boardTitle.trim() !== '') {
            const newBoard = { title: boardTitle, tasks: [] };
            setBoards([...boards, newBoard]);
            setBoardTitle('');
        }
    };

    // Helper function to delete a board and its associated tasks
    const handleDeleteBoard = (index) => {
        const updatedBoards = boards.filter((_, idx) => idx !== index);
        setBoards(updatedBoards);

        // Also delete tasks associated with this board
        const updatedTasks = { ...tasks };
        delete updatedTasks[index];
        setTasks(updatedTasks);
    };

    // Helper function to add a new task to a board
    const handleAddTask = (index) => {
        if (taskText.trim() !== '') {
            const newTask = {
                text: taskText,
                description: taskDescription,
                dueDate: dueDate,
                status: taskStatus,
            };

            const updatedBoards = [...boards];
            updatedBoards[index].tasks.push(newTask);
            setBoards(updatedBoards);

            setAllTasks([...allTasks, newTask]);

            setTaskText('');
            setTaskDescription('');
            setDueDate('');
            setTaskStatus('Todo');
        }
    };
    const handleSortChange = (option) => {
        setSortOption(option);
    };
    const handleDragEnd = (result) => {
        // ... (Your drag and drop logic here)
        // This function should handle the reordering of tasks after drag and drop.
        // It will be called automatically when a drag and drop action is completed.
    };


    const statusOptions = ['DueToday', 'Due this week', 'Overdue'];

    const filteredTasks = search
        ? boards.flatMap((board, boardIndex) =>
            board.tasks.filter(
                (task) =>
                    task.text.toLowerCase().includes(search.toLowerCase()) ||
                    task.description.toLowerCase().includes(search.toLowerCase())
            )
        )
        : allTasks.flatMap((boardTasks) => boardTasks);

    const sortedTasks = [...filteredTasks].sort((task1, task2) => {
        if (sortOption === 'newest') {
            return task2.createdAt - task1.createdAt;
        } else if (sortOption === 'oldest') {
            return task1.createdAt - task2.createdAt;
        } else {
            return task1.text.localeCompare(task2.text);
        }
    });
    const handleEditBoard = (index, newTitle) => {
        const updatedBoards = [...boards];
        updatedBoards[index].title = newTitle;
        setBoards(updatedBoards);
    };
    const handleDeleteTask = (boardIndex, taskIndex) => {
        const updatedBoards = [...boards];
        updatedBoards[boardIndex].tasks.splice(taskIndex, 1);
        setBoards(updatedBoards);
    };


    return (
        <>

            <Form>
                <InputGroup className="my-3">
                    <Form.Control
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search Tasks"
                    />
                </InputGroup>
            </Form>
            <TaskTable allTasks={allTasks} search={search} />

            {/* Drag and Drop Context */}
            <DragDropContext onDragEnd={handleDragEnd}>
                <div>
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

                    {/* Map through boards to display each board */}
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
                                        value={board.title} // Access the board's title
                                        onChange={(e) => handleEditBoard(index, e.target.value)}
                                    />
                                    <button onClick={() => handleDeleteBoard(index)}>
                                        Delete Board
                                    </button>
                                    <div>
                                        {/* Input fields for task creation */}
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
                                        <input
                                            type="Date"
                                            value={dueDate}
                                            onChange={(e) => setDueDate(e.target.value)}
                                            placeholder="Enter Due Date"
                                        />
                                        <select
                                            value={taskStatus}
                                            onChange={(e) => setTaskStatus(e.target.value)}
                                        >
                                            {statusOptions.map((status) => (
                                                <option key={status} value={status}>
                                                    {status}
                                                </option>
                                            ))}
                                        </select>
                                        <button onClick={() => handleAddTask(index)}>
                                            Add Task
                                        </button>
                                    </div>

                                    {/* Access the tasks array of the board and map through it */}
                                    <Droppable
                                        droppableId={`tasks-${index}`}
                                        key={`tasks-${index}`}
                                    >
                                        {(provided) => (
                                            <ul ref={provided.innerRef} {...provided.droppableProps}>
                                                {board.tasks.map((task, taskIndex) => (
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
            </DragDropContext>
        </>
    );
};

export default Boards;




