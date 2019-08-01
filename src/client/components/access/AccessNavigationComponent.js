/*
 Created By: Lightnet
 License: MIT
 
*/

import React, { Component } from "react";

export default class AccessNavigationComponent extends Component {

    constructor(props) {
        super(props);
        //style
        this.divStyleLink = {
            display:'inline-block',
            color: 'blue',
            padding: '8px',
        };
    }

    clickSelectTab(key){
        //console.log(key);
        this.props.onClick(key);
        //this.setState({blogin: true});
    }

    /*
    <a href="#" style={this.divStyleLink} onClick={()=>this.clickSelectTab('messages')}>Messages</a>
    <a href="#" style={this.divStyleLink} onClick={()=>this.clickSelectTab('chat')}>Chat</a>
    <a href="#" style={this.divStyleLink} onClick={()=>this.clickSelectTab('todolist')}>To Do List</a>

    */
    
    render() {
        return (
            <div>
                <a href="#" style={this.divStyleLink} onClick={()=>this.clickSelectTab('profile')}>Profile</a>
                <a href="#" style={this.divStyleLink} onClick={()=>this.clickSelectTab('passphasehint')}>Passphase Hint</a>
                <a href="#" style={this.divStyleLink} onClick={()=>this.clickSelectTab('changepassphase')}>Change Passphrase</a>
                <a href="#" style={this.divStyleLink} onClick={()=>this.clickSelectTab('logout')}> Logout</a>
            </div>
        );
    }
}
