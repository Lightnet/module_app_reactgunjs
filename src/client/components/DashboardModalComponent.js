/*
 Created By: Lightnet
 License: MIT
 
*/

import React, { Component } from "react";
import ModalComponent from  "./base/ModalComponent";

export default class DashboardModalComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { show: false };
    this.showModal = this.showModal.bind(this);
  }
  
  showModal(e){
    this.setState({ 
      show: !this.state.show
    });
  }

  render() {
    return (
      <main>
        <ModalComponent show={this.state.show} onClose={this.showModal}>
          <p>Modal</p>
          <p>Data</p>
        </ModalComponent>
        <button type="button" className="toggle-button" onClick={this.showModal.bind(this)}>
          open
        </button>
      </main>
    );
  }
}