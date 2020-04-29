import React, { useState } from "react";
import logo from "./Images/NumuLogo.png";
import "./App.css";
import Home from "./Pages/Home";
import UserDetail from "./Pages/UserDetail";
import Dashboard from "./Pages/Dashboard";
import Button from "@material-ui/core/Button";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

function App() {
  const classes = useStyles();
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>NUMU Coding Assignment</p>
      </header>

      <div className="table-Area">
        <Router>
          <Switch>
            <Route exact path="/">
              <Dashboard />
              {/* <Dash /> */}
            </Route>
            <Route exact path="/home">
              <Home />
            </Route>
            <Route exact path="/userDetail/:id" component={UserDetail}></Route>
          </Switch>
        </Router>
        <br />
        <div className={classes.root}>
          <Button variant="contained" href="/home">
            Home
          </Button>
          <Button variant="contained" color="primary" href="/userDetail/404">
            User Detail
          </Button>
          <Button variant="contained" href="/">
            Dashboard
          </Button>
        </div>
      </div>

      <br />
      <br />
    </div>
  );
}

export default App;
