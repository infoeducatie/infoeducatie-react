"use strict";

import "blueimp-file-upload";
import "../../../node_modules/blueimp-file-upload/css/jquery.fileupload.css";
import "../../../node_modules/blueimp-file-upload/css/jquery.fileupload-ui.css";
import $ from "jquery";
import React from "react";
import _ from "lodash";
import DeepLinkedStateMixin from "react-deep-link-state";
import { ButtonInput, Input, Glyphicon } from "react-bootstrap";

import FormMixin from "../../mixins/form"


export default React.createClass({
  displayName: "RegisterScreenshots",

  componentDidMount() {
    $('#fileupload').fileupload({
      dataType: 'json',
      headers: {
        Authorization: this.props.access_token
      },
      add: (e, data) => {
        data.submit();
      },
      done: () => {
        this.props.onSubmit();
      },
      error: () => {
        window.alert("eroare"); // eslint-disable-line
      }
    });
  },

  render() {
    let url = window.config.API_URL + this.props.formEndpoint;
    return <div>
      <p>Trebuie minim <em>1</em> și maxim <em>3</em> capturi de ecran.</p>
      <p>Până acum ai încărcat <em>{this.props.screenshotsCount}</em>.</p>
      { this.props.screenshotsCount > 0 ?
        <p>Daca nu vrei să mai adaugi capturi de ecran&nbsp;
          <a href="#" data-step={4} onClick={this.props.onSkipStep}>
          click aici</a>.
        </p>
        : null
      }
      <span className="btn btn-success fileinput-button">
        <Glyphicon glyph="upload" />
        <span>&nbsp;Alege o imagine</span>
        <input id="fileupload"
               type="file"
               name="screenshots[]"
               data-url={url} />
      </span>
    </div>;
  }
});