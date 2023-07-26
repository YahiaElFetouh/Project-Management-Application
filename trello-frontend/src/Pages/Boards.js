// import * as Yup from "yup";
// import { Form, FormikProvider, useFormik } from "formik";
// import { LoadingButton } from "@mui/lab";
// import {
//   Container,Stack,TextField,Box,Typography} from "@mui/material";
//   import React, { useState } from 'react';
//
//
//
// export default function Boards() {
//
//
//
//     const [cards, setCards] = useState([]);
//
//     const addCard = () => {
//       const createNewCards = [...cards, <div key={cards.length} >New Card</div>];
//       setCards(createNewCards);
//     };
//
// // in this code, new divs are created when the button is clicked. New divs are basically cards, which will later on
// // have tasks in it
//   return (
//     <div>
//       <button class ="div-wrapper" onClick={addCard}>Create a new card</button>
//
//       {/* I have used the following resources to learn about map():
//       1) https://stackoverflow.com/questions/69065759/create-div-using-button-react
//       2) https://www.w3schools.com/js/js_maps.asp */}
//       {cards.map((cards) => cards)}
//     </div>
//   );
// }
//
//
//
//
//
import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import axios from 'axios';

const Boards = () => {
    const [boards, setBoards] = useState([]);
    const [boardTitle, setBoardTitle] = useState('');
    const [tasks, setTasks] = useState('');
    const [taskText, setTaskText] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [members, setMembers] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);
    const [selectedMember, setSelectedMember] = useState(null);
        
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
                    { text: taskText, description: taskDescription },
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

    const handleAssignMember = (task, member) => {
        // Send the API request to assign the member to the task
        axios
          .put(`http://localhost:8080/task/fetch/${task.id}`, { memberId: member.id })
          .then(() => {
            // Update the state after a successful assignment
            const updatedTasks = tasks.map((t) => {
              if (t.id === task.id) {
                return { ...t, assignedMemberId: member.id };
              }
              return t;
            });
            setTasks(updatedTasks);
          })
          .catch((error) => console.error(error));
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

    return (
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
                                    <button onClick={() => handleAddTask(index)}>Add Task</button>
                                </div>
                                <Droppable droppableId={`tasks-${index}`} key={`tasks-${index}`}>
                                    {(provided) => (
                                        <ul ref={provided.innerRef} {...provided.droppableProps}>
                                            {provided.placeholder}
                                        </ul>
                                    )}
                                </Droppable>
                            </div>
                        )}    
                            {tasks[index] && tasks[index].map((task, taskIndex) => (
                                <Draggable
                                    key={task.Id}
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
                                    <span className="task-description">{task.description}</span>
                                )}
                                <button onClick={() => handleDeleteTask(index, taskIndex)}>
                                Delete Task
                                </button>
                                <select
                                    value={
                                        selectedTask === task ? (selectedMember ? selectedMember.id : '') : ''
                                    }
                                    onChange={(e) => {
                                        setSelectedTask(task);
                                        setSelectedMember(
                                            e.target.value ? members.find((member) => member.id === e.target.value) : null
                                        );
                                    }}
                                >           
                                <option value="">Assign Member</option>
                                {members.map((member) => (
                                <option key={member.id} value={member.id}>
                                        {member.name}
                                </option>
                                ))}
                                </select>
                                <button
                                    onClick={() => handleAssignMember(task, selectedMember)}
                                    disabled={!selectedTask || !selectedMember}
                                >
                                Assign
                                </button>
                                </li>
                                )}
                            </Draggable>
                        ))} 
                    </Droppable>
                    
                ))} 
            </div>
        </DragDropContext>
    );
};

export default Boards;

