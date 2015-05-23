"use strict";

import React from "react";

import Header from "./header";
import Footer from "./footer";
import Authentication from "../mixins/authentication.jsx"

import "./jury.less";


export default React.createClass({

  displayName: "Jury",
  render() {
    return <div className="jury">
        <div className="row blue-section">
            <Header isLoggedIn={this.props.isLoggedIn} />
            <h1>Juriul InfoEducație</h1>
            <h2>Membrii juriului pe categorii</h2>
        </div>
        <Footer />
    </div>;
  }
});
