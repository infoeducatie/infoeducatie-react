"use strict";

import $ from "jquery";
import React from "react";

import ctx from "classnames";
import {Grid, Row, Col} from "react-bootstrap";

import Header from "./header";

import "../main.less";

export default React.createClass({
  displayName: "Alumni",

  getInitialState() {
    return {
      alumni: []
    };
  },

  componentDidMount() {
    $.ajax({
      method: "GET",
      url: window.config.API_URL + "alumni.json",
      success: this.onSuccess
    });
  },

  onSuccess(data) {
    this.setState({
      alumni: data
    });
  },

  renderAlumnus(alumnus, index) {
    let colors = ["green", "orange", "black"];
    let className = ctx("alumnus-container", colors[index % colors.length]);
    let editions = alumnus.editions.map(function(edition) {
                                          return parseInt(edition.name);
                   });
    let alumnusImage = "http://www.gravatar.com/avatar/" + alumnus.user.email_md5 + "?s=150&d=mysteryman";

    return <Row key={index}>
      <Col mdOffset={2} md={8} smOffset={1} sm={10}>
        <Row className="xsmall-spacing" />
        <Row>
          <Col className={className} xs={12}>
            <Row className="xsmall-spacing" />
            <Row>
              <Col xs={3} xsOffset={1}>
                <Row className="xsmall-spacing" />
                <div className="alumnus-image">
                  <img src={alumnusImage} />
                </div>
              </Col>
              <Col xs={8}>
                <p>{alumnus.description}</p>
                <Row className="xsmall-spacing" />
                <h5 className="alumnus-name">
                  {alumnus.user.first_name} &nbsp;
                  {alumnus.user.last_name}
                </h5>
                <p className="alumnus-position">{alumnus.user.job}</p>
                <p className="alumnus-editions">
                  {editions.sort().reverse().map(function(edition) {
                    return <span>{edition}</span>;
                  })}
                </p>
              </Col>
            </Row>
            <Row className="xsmall-spacing" />
          </Col>
        </Row>
      </Col>
    </Row>;
  },

  render() {
    return <div className="alumni">
      <div className="gray-section-wrapper">
        <Grid className="gray-section">
          <Row>
            <Col xs={12}>
              <Header isLoggedIn={this.props.isLoggedIn}
                      login={this.props.login}
                      logout={this.props.logout} />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <h1>Alumni InfoEducație</h1>
              <h2>Generația IT din România</h2>
            </Col>
          </Row>
          <Row className="big-spacing" />
        </Grid>
      </div>
      <Grid>
        {this.state.alumni.map(this.renderAlumnus)}
      </Grid>
   </div>;
  }
});
