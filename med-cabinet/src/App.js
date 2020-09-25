import React from "react";
import logo from "./logo.svg";
import TreatmentForm from "./components/DashboardComps/TreatmentForm";
import Dashboard from "./components/DashboardComps/Dashboard";
import StrainPage from "./components/DashboardComps/StrainPage";
// import Profile from './components/Profile';
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import "./App.css";
import { PrivateRoute } from "./components/PrivateRoute";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <Route exact path="/register">
        <Register />
      </Route>

      <Route exact path="/login">
        <Login />
      </Route>
      {/* This actually needs to route to the dashboard component that contains the form */}
      <PrivateRoute exact path="/protected" component={Dashboard} />

      <Route exact path={`/profile/:id`}>
        <Profile />
      </Route>

      <Route exact path={`/strainpage/:id`}>
        <StrainPage />
      </Route>
    </Router>
  );
}

export default App;
