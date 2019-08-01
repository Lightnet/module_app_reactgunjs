/*
 Created By: Lightnet
 License: MIT
 Credit: https://blog.bitsrc.io/build-a-simple-modal-component-with-react-16decdc111a6 
*/

import React, { Component } from "react";

export default class ModalComponent extends Component {
    constructor(props) {
      super(props);
      this.state = { show: props.show };
      this.onClose = this.onClose.bind(this);
    }

    onClose(e){
        //console.log("close?");
        this.props.onClose && this.props.onClose(e);
    }

    render() {

        if (!this.props.show) {
            return null;
        }

        return (
            <div className="modal" id="modal">
                <h2>Modal Window</h2>
                <div className="content">{this.props.children}</div>
                <div className="actions">
                    <button className="toggle-button" onClick={this.onClose}> Close </button>
                </div>
            </div>
        );
    }
}