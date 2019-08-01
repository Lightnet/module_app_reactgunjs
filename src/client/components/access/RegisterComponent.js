/*
 Created By: Lightnet
 License: MIT
 
*/

import React, { Component } from "react";
//import {gun} from "../store";
//https://facebook.github.io/create-react-app/docs/importing-a-component

export default class RegisterComponent extends Component {

    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            alias: "",
            passphase: "",
            //isLoggedIn: props.isLoggedIn,
        };
        console.log(this);
        this.btnregister = this.btnregister.bind(this);
    }

    btnregister(event){
        event.preventDefault();
        console.log("btnregister");
    }

    render() {

        return( 
            <div>
                Register
            </div>
        );  
    }
}