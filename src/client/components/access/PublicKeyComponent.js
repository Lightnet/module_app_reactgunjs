/*
 Created By: Lightnet
 License: MIT
 
*/

import React, { Component } from "react";

export default class PublicKeyComponent extends Component {
    constructor(props) {
        super(props);
        let user = this.$gun.user();
        //user = {};
        let alias = user.is.alias || "Guest";
        let pub = user.is.pub || "";

        this.state = {
            alias:alias,
            publickey:pub,
            bDisplayPublicKey:true,
            DisplayPublicKeyWidth:98,
        }
    }

    handleChangePublicKey(event) {
        this.setState({publickey: event.target.value});
    }

    togglePublicKey(){
        let bDisplayPublicKey = this.state.bDisplayPublicKey;
        if(bDisplayPublicKey){
            bDisplayPublicKey = false;
            this.setState({DisplayPublicKeyWidth: 20});
        }else{
            bDisplayPublicKey = true;
            this.setState({DisplayPublicKeyWidth: 98});
        }

        this.setState({bDisplayPublicKey: bDisplayPublicKey});
    }

    PublicKeyCopy(){
        let publicKey = document.getElementById('publickey');
        publicKey.select();
        document.execCommand('copy');
    }

    render() {
        return (
            <div>
                <label>Alias: {this.state.alias} </label>
                <button onClick={()=>this.togglePublicKey()}>Public Key</button>
                <button onClick={()=>this.PublicKeyCopy()}>Copy</button>
                <input id="publickey" value={this.state.publickey} onChange={this.handleChangePublicKey.bind(this)} size={this.state.DisplayPublicKeyWidth} readOnly />
            </div>
        );
    }
}
