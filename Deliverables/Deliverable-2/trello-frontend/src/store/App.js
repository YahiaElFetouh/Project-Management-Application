
import './App.css';
import{ store } from "./index"
import {BrowserRouter} from "react-router-dom";
import Router from "./routes";
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <>
    <Provider store={store}>
      <ToastContainer />
      <BrowserRouter>
      <Router />
      
      </BrowserRouter>
    </Provider>
    
    
    </>
  
     
  );
}

export default App;
