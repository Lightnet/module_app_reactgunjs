/*
 Created By: Lightnet
 License: MIT
 
*/

import React, { Component } from "react";

import ProfileComponent from "./ProfileComponent";
import ChangePassphraseComponent from "./ChangePassphraseComponent";
import PassphraseHintComponent from "./PassphraseHintComponent";
import MessagesComponent from "./MessagesComponent";
import ContactsComponent from "./ContactsComponent";
import ChatComponent from "./ChatComponent";
import ToDoListComponent from "./ToDoListComponent";

import PublicKeyComponent from "./PublicKeyComponent";
import AccessNavigationComponent from "./AccessNavigationComponent";
import LogoutComponent from "./LogoutComponent";

//import {gun} from "../store";
//https://facebook.github.io/create-react-app/docs/importing-a-component

export default class AccessMainComponent extends Component {

    constructor(props) {
        super(props);
        this.state={
            index:'profile',
        }
        //this.btnlogout = this.btnlogout.bind(this);
    }

    clickSelectTab(key){
        //console.log(key);
        this.setState({index: key});
    }

    DisplayIndex(Gelement){
        return (
            <div>
                <PublicKeyComponent />
                <AccessNavigationComponent onClick={this.clickSelectTab.bind(this)}/>
                <Gelement />
            </div>
        );
    }

    render() {
        let pageindex = this.state.index;
        /*
        const buttonStyle = {
            //color: 'white',
            //"backgroundColor":'black',
            "border":"none",
            //backgroundImage: 'url(' + imgUrl + ')',
        };
        */
        let elcontext;

        if(pageindex == 'profile'){
            elcontext = ProfileComponent;
        }else if(pageindex == 'passphasehint'){
            elcontext = PassphraseHintComponent;
        }else if(pageindex == 'changepassphase'){
            elcontext = ChangePassphraseComponent;
        }else if(pageindex == 'contacts'){
            elcontext = ContactsComponent;
        }else if(pageindex == 'chat'){
            elcontext = ChatComponent;
        }else if(pageindex == 'messages'){
            elcontext = MessagesComponent;
        }else if(pageindex == 'todolist'){
            elcontext = ToDoListComponent;
        }else if(pageindex == 'logout'){
            elcontext = LogoutComponent
            //let user = this.$gun.user();
            //user.leave();
            //location.reload();
        }else{
            elcontext = ProfileComponent;
        }
                
        return this.DisplayIndex(elcontext);
    }
}