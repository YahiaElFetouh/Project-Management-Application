import "./App.css";
import { store } from "./store";
import { Provider } from "react-redux";
import { BrowserRouter } from 'react-router-dom';
import Router from "./routes";

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
