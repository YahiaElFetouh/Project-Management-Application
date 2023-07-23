
import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { Form, InputGroup } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
const TaskTable = ({ allTasks, search, filterOption }) => {
    const filteredTasks = allTasks.filter((task) => {
        // Apply search filter
        const isTextMatch =
          task.text.toLowerCase().includes(search.toLowerCase()) ||
          task.description.toLowerCase().includes(search.toLowerCase());
    
        // Apply due date filter
        const now = new Date().getTime();
        const dueDate = new Date(task.dueDate).getTime();
    
        if (filterOption === "today") {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          const todayStart = today.getTime();
          const todayEnd = todayStart + 24 * 60 * 60 * 1000; // Add one day in milliseconds
          return isTextMatch && dueDate >= todayStart && dueDate < todayEnd;
        } else if (filterOption === "thisWeek") {
          const endOfWeek = new Date();
          endOfWeek.setDate(endOfWeek.getDate() + (7 - endOfWeek.getDay()));
          endOfWeek.setHours(23, 59, 59, 999);
          const endOfWeekTime = endOfWeek.getTime();
          return isTextMatch && dueDate <= endOfWeekTime;
        } else if (filterOption === "overdue") {
          return isTextMatch && dueDate < now;
        }
    
        // If no filter option is selected, show all tasks that match the search
        return isTextMatch;
      });
      return (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Task</th>
              <th>Description</th>
              <th>Due date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map((task, index) => (
              <tr key={index}>
                <td>{task.text}</td>
                <td>{task.description}</td>
                <td>{task.dueDate}</td>
                <td>{task.status}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      );
    };

const Boards = () => {
    const [search, setSearch] = useState('');
    const [boards, setBoards] = useState([]);
    const [boardTitle, setBoardTitle] = useState('');
    const [tasks, setTasks] = useState([]);
    const [taskText, setTaskText] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [Date, setDueDate] = useState('');
    const [taskStatus, setStatus] = useState('Todo');
    const [allTasks, setAllTasks] = useState([]); 
    const [filterOption, setFilterOption] = useState(null); // State to store the filter option

  // Function to handle filter option change
    const handleFilterChange = (option) => {
    setFilterOption(option);
    };

    const handleCreateBoard = () => {
        if (boardTitle.trim() !== '') {
          // Create a new board object with an empty tasks array
          const newBoard = { title: boardTitle, tasks: [] };
      
          // Update the boards state by adding the new board object
          setBoards([...boards, newBoard]);
      
          // Clear the input field after adding the board
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
          const newTask = { text: taskText, description: taskDescription, dueDate: Date, status: taskStatus};
          
          // Create a copy of the boards state
          const updatedBoards = [...boards];
          
          // Push the new task to the specified board's tasks array
          updatedBoards[index].tasks.push(newTask);
          
          // Update the boards state with the modified board object
          setBoards(updatedBoards);
      
          // Add the new task to the allTasks state
          setAllTasks([...allTasks, newTask]);
      
          // Clear the input fields after adding the task
          setTaskText('');
          setTaskDescription('');
          setDueDate('');
          setStatus('Todo'); 
        }
      };
      
      const handleDeleteTask = (boardIndex, taskIndex) => {
        const updatedTasks = { ...tasks };
      
        // Check if the boardIndex exists in the updatedTasks object
        if (updatedTasks[boardIndex]) {
          updatedTasks[boardIndex].splice(taskIndex, 1);
          setTasks(updatedTasks);
        }
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
    const statusOptions = ['ToDo', 'In Progress', 'Done'];


    return (
        
        <>
        <Form>
          <InputGroup className='my-3'>
            {/* onChange for search */}
            <Form.Control
              onChange={(e) => setSearch(e.target.value)}
              placeholder='Search Tasks'
            />
          </InputGroup>
        </Form>
        <div>
        <button onClick={() => handleFilterChange(null)}>All</button>
        <button onClick={() => handleFilterChange("today")}>Due Today</button>
        <button onClick={() => handleFilterChange("thisWeek")}>Due This Week</button>
        <button onClick={() => handleFilterChange("overdue")}>Overdue</button>
      </div>
        <TaskTable allTasks={allTasks} search={search} filterOption={filterOption} />
       

        <DragDropContext onDragEnd={handleDragEnd}>
                <div>
                    <div>
                        <h2>Create a new board</h2>
                        <input
                            type="text"
                            value={boardTitle}
                            onChange={(e) => setBoardTitle(e.target.value)}
                            placeholder="Enter board title" />
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
                    value={board.title} // Access the board's title
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
                    <input
                      type="Date"
                      value={Date}
                      onChange={(e) => setDueDate(e.target.value)}
                      placeholder="Enter Due Date"
                    />
                     <select value={taskStatus} onChange={(e) => setStatus(e.target.value)}>
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
                  {/* Access the tasks array of the board */}
                  <Droppable droppableId={`tasks-${index}`} key={`tasks-${index}`}>
                    {(provided) => (
                      <ul ref={provided.innerRef} {...provided.droppableProps}>
                        {board.tasks.map((task, taskIndex) => ( // Map through the tasks array
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
                                  onClick={() => handleDeleteTask(index, taskIndex)}
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