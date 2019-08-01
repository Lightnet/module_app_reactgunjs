/*
 Created By: Lightnet
 License: MIT

 Entry Point to reactjs
 
*/
localStorage.clear();

import "@babel/polyfill";
import React, { Component } from "react";
import ReactDOM from "react-dom";
//import Gun from "gun/gun";
//import "gun/sea";
import {setGun} from "./store";
import "./global.scss";

import LoginComponent from "./components/access/LoginComponent";
import ForgotPassphaseComponent from "./components/access/ForgotPassphaseComponent";
import AppContentComponent from "./components/AppContentComponent";

//https://gun.eco/docs/React-Native
//React.Component.prototype.$gun = gun;

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            isLoggedIn:false,
            isForgotPassphrase:false
        };

        //this.gun = Gun();
        let gunurl = window.location.origin +"/gun";
        console.log(gunurl);
        this.gun = Gun(gunurl);
        setGun(this.gun);
        React.Component.prototype.$gun = this.gun;
        //console.log(this.gun);
        this.updateLogin = this.updateLogin.bind(this);
        this.handle_forgotcall = this.handle_forgotcall.bind(this);
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    updateLogin(checked){
        this.setState({
            isLoggedIn: checked,
        });
    }

    handle_login(e){
        //console.log("click...");
        this.updateLogin(true);
    }

    handle_backcall(e){
        console.log("click...");
        //this.updateLogin(true);
        this.setState({
            isForgotPassphrase: false
        });
    }

    handle_forgotcall(e){
        console.log("call forgot ui");
        this.setState({
            isForgotPassphrase: true
        });
    }

    render() {
        const isLoggedIn = this.state.isLoggedIn;
        const isForgotPassphrase = this.state.isForgotPassphrase;
        let elementContent;

        if (isLoggedIn) {
            elementContent = <AppContentComponent />;
        } else {
            if(isForgotPassphrase){
                elementContent = <ForgotPassphaseComponent backcall={this.handle_backcall.bind(this)}></ForgotPassphaseComponent>
            }else{
                elementContent = <LoginComponent loginPass={this.handle_login.bind(this)} forgotpassphrasecall={this.handle_forgotcall} />;
            }
            
        }

        return ( 
            <div>
                {/*<h1>Hello World, reactjs gunjs template!</h1>*/}
                {elementContent}
            </div>
        );  
    }
    
}

ReactDOM.render(
    <Main />,
    document.getElementById("root")
);