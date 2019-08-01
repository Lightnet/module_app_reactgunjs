/*
 Created By: Lightnet
 License: MIT
 
*/

import React, { Component } from "react";
import {gun} from "../store";
//https://facebook.github.io/create-react-app/docs/importing-a-component

export default class GunDataButtonComponent extends Component {

    constructor(props) {
        super(props);
        //console.log(gun);
        // https://reactjs.org/docs/handling-events.html
        // This binding is necessary to make `this` work in the callback
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        console.log("test button");
        gun.get("test").once(ack=>{
            console.log(ack);
        });
    }

    render() {    
        return <button onClick={this.handleClick}>Gun get Data</button>;  
    }
}