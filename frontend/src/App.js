import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import "./App.css"
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/styles/tailwind.css";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";

const App = () => {
  return (
    <Switch>
      <Route exact path="/" component={Landing} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/dashboard" component={Dashboard} />
      <Route exact path="/settings" component={Settings} />
      <Redirect from="*" to="/" />
    </Switch>
  );
};

export default App;
