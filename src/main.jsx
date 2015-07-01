"use strict";

import React from "react";
import Router from "react-router";
import Raven from "raven-js"

let { Route, RouteHandler, DefaultRoute } = Router; // eslint-disable-line

import "babel-core/polyfill";
import "./main.less";

import Photos from "./components/photos";
import Alumni from "./components/alumni";
import RegisterInContest from "./components/register-in-contest";
import About from "./components/about";
import Register from "./components/register";
import Jury from "./components/jury";
import Home from "./components/home";
import Calendar from "./components/calendar";
import Results from "./components/results";
import Kitchen from "./components/kitchen";
import Footer from "./components/footer";
import Contestants from "./components/contestants/contestants";
import StaticPDF from "./components/static-pdf";


let App = React.createClass({
  displayName: "App",

  getInitialState() {
    let user = JSON.parse(localStorage.getItem("user"));
    return {
      currentUser: user,
      isLoggedIn: user ? true : false
    };
  },

  componentDidMount() {
    // TODO @palcu: Do API request to /current and re-render whole app
  },

  render() {
    return <div className="main">
      <RouteHandler currentUser={this.state.currentUser}
                    isLoggedIn={this.state.isLoggedIn}
                    login={this.login}
                    logout={this.logout} />
      <Footer />
    </div>;
  },

  login(user) {
    this.setState({
      isLoggedIn: true,
      currentUser: user
    });
    localStorage.setItem("user", JSON.stringify(user));
  },

  logout() {
    localStorage.removeItem("user");
    this.setState({
      isLoggedIn: false,
      currentUser: null
    });
  }
});


let routes = (
  <Route path="/" handler={App}>
    <Route handler={Home} name="home" />
    <Route handler={Jury} name="jury" />
    <Route handler={RegisterInContest} name="register-in-contest" />
    <Route handler={Alumni} name="alumni" />
    <Route handler={Photos} name="photos" />
    <Route handler={About} name="about" />
    <Route handler={Register} name="register" />
    <Route handler={Calendar} name="calendar" />
    <Route handler={Results} name="results" />
    <Route handler={Kitchen} name="kitchen" />
    <Route handler={Contestants} name="contestants" />

    <Route handler={StaticPDF} name="static" path="/static/:type" />

    <DefaultRoute handler={Home} />
  </Route>
);

Router.run(routes, Router.HistoryLocation, (Root) => {
  React.render(<Root />, document.getElementById("app"));
});

if ("SENTRY_DSN" in window.config && window.config.SENTRY_DSN.length) {
  Raven.config(window.config.SENTRY_DSN, {
    whitelistUrls: [/((ui\.dev|www|new)\.)?infoeducatie\.ro/]
  }).install();
} else {
  Raven.config(false);
}

export default App;
