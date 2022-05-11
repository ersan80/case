import React from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import AddList from "../pages/AddList";
import List from "../pages/List";
import Navbar from "../pages/Navbar";

const AppRouter = () => {
  return (
    <Router>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<List/>} />
        <Route path="/addList" element={<AddList/>}/>
      </Routes>
    </Router>
  );
};

export default AppRouter;
