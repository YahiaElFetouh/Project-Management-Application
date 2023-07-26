import "./App.css";
import { store } from "./store";
import { Provider } from "react-redux";
import { BrowserRouter } from 'react-router-dom';
import Router from "./routes";
import Boards from './Pages/Boards';

function App() {
  return (
    <div className="App">
      <h1>Trello-like App</h1>
      <Boards />
    </div>
  );
}

export default App;
