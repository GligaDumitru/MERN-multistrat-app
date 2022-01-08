import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import "./App.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/styles/tailwind.css";

import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import { useDispatch } from "react-redux";
import { aboutMeAsync } from "./features/auth/authSlice";
import ForgotPassword from "./pages/ForgotPassword";
import EmailSent from "./pages/EmailSent";
import ResetPassword from "./pages/ResetPassword";
import People from "./pages/People";
import Projects from "./pages/Projects";
import EditProject from "./components/projects/edit/EditProject";
import Timesheets from "./pages/Timesheets";
import ViewTimesheet from "./components/timesheets/ViewTimesheet";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(aboutMeAsync());
  });

  return (
    <Switch>
      <Route exact path="/" component={Landing} />
      <Route exact path="/people" component={People} />
      <Route exact path="/projects" component={Projects} />
      <Route exact path="/timesheets" component={Timesheets} />
      <Route exact path="/timesheets/:id" component={ViewTimesheet} />
      <Route exact path="/projects/:id" component={EditProject} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/dashboard" component={Dashboard} />
      <Route exact path="/settings" component={Settings} />
      <Route exact path="/forgot-password" component={ForgotPassword} />
      <Route exact path="/email-sent" component={EmailSent} />
      <Route exact path="/reset-password" component={ResetPassword} />
      <Redirect from="*" to="/" />
    </Switch>
  );
};

export default App;
