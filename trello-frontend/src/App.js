import React from 'react';
import LoginForm from './LoginForm';
import {Route, Routes} from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";

const App = () => {
  return (
    <Routes>
        <Route path={''} index element={<Dashboard />}/>
        <Route path={'login'} element={<LoginForm />}/>
    </Routes>
  );
};

export default App;
