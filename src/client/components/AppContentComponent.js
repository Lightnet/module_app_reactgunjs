/*
 Created By: Lightnet
 License: MIT
 
*/

import React, { Component } from "react";
import AccessMainComponent from "./access/AccessMainComponent";
import DashboardModalComponent from "./DashboardModalComponent";

export default class AppContentComponent extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
            <DashboardModalComponent></DashboardModalComponent>
            <AccessMainComponent></AccessMainComponent>

            </div>
        );
    }
}
