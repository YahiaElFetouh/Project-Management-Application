// import "./App.css";
// import { store } from "./store";
// import { Provider } from "react-redux";
// import { BrowserRouter } from 'react-router-dom';
// import Router from "./routes";
//
// import React, { useState } from 'react';
// import './App.css';
//
// function App() {
//     const [boards, setBoards] = useState([]);
//     const [boardTitle, setBoardTitle] = useState('');
//
//     const handleCreateBoard = () => {
//         if (boardTitle.trim() !== '') {
//             setBoards([...boards, boardTitle]);
//             setBoardTitle('');
//         }
//     };
//
//     const handleDeleteBoard = (index) => {
//         const updatedBoards = boards.filter((board, idx) => idx !== index);
//         setBoards(updatedBoards);
//     };
//
//     return (
//         <div className="App">
//             <h1>Trello-like App</h1>
//             <div className="board-container">
//                 <div className="board-form">
//                     <input
//                         type="text"
//                         value={boardTitle}
//                         onChange={(e) => setBoardTitle(e.target.value)}
//                         placeholder="Enter board title"
//                     />
//                     <button onClick={handleCreateBoard}>Create Board</button>
//                 </div>
//                 <div className="boards-list">
//                     {boards.map((board, index) => (
//                         <div key={index} className="board">
//                             <span>{board}</span>
//                             <button onClick={() => handleDeleteBoard(index)}>Delete</button>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// }
//
// export default App;
import React from 'react';
import './App.css';
import{ store } from "./store";
import {BrowserRouter} from "react-router-dom";
import Router from "./routes";
import { Provider } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css'


function App() {
    return ( 
        <>
        <Provider store={store}>
            <BrowserRouter>
            <Router />
            </BrowserRouter>
        </Provider>
    
        </>
    );
}

export default App;
