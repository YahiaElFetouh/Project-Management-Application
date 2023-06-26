
import './App.css';
import{ store } from "./store"
import {BrowserRouter} from "react-router-dom";
import Router from "./routes";
import { Provider } from 'react-redux';

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
