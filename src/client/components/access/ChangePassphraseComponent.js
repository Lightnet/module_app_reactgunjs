/*
 Created By: Lightnet
 License: MIT
 
*/

import React, { Component } from "react";
//import {gun} from "../store";
//https://facebook.github.io/create-react-app/docs/importing-a-component

export default class ChangePassphraseComponent extends Component {

    constructor(props) {
        super(props);
        //console.log(props);
        this.state = {
            alias: "",
            oldpassphase: "",
            newpassphase: "",
        };

        this.handleChangeOldPassphrase = this.handleChangeOldPassphrase.bind(this);
        this.handleChangeNewPassphrase = this.handleChangeNewPassphrase.bind(this);
        this.btnapplychange = this.btnapplychange.bind(this);
    }

    btnapplychange(event){
        event.preventDefault();
        console.log("btnapplychange");
        let user = this.$gun.user();
        //console.log(user)
        if (user.is ==null){
            //this.$root.$emit('dialogmessage',"Alias is Null");
            return
        }
        let self = this;
        console.log(self.state.oldpassphrase);
        console.log(self.state.newpassphrase);
        if(!self.state.oldpassphrase || !self.state.newpassphrase){
            console.log('empty!');
            return;
        }
        user.auth(user.is.alias, self.state.oldpassphrase, (ack) => {//user auth call
            //console.log(ack);
            let status = ack.err || "Saved!";//check if there error else saved message.
            console.log(status);
        }, {change: self.state.newpassphrase});//set config to change password
    }

    handleChangeOldPassphrase(event) {
        this.setState({oldpassphrase: event.target.value});
    }
    handleChangeNewPassphrase(event) {
        this.setState({newpassphrase: event.target.value});
    }

    render() {

        return( 
            <div>
                <table>
                    <tbody>
                        <tr>
                            <td>Old Passphrase</td>
                            <td><input value={this.state.oldpassphrase || ""} onChange={this.handleChangeOldPassphrase.bind(this)} /></td>
                        </tr>
                        <tr>
                            <td>New Passphrase</td>
                            <td><input value={this.state.newpassphrase || ""} onChange={this.handleChangeNewPassphrase.bind(this)} /></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td><button onClick={this.btnapplychange.bind(this)}>Change</button></td>
                        </tr>
                    </tbody>
                </table>

            </div>
        );  
    }
}