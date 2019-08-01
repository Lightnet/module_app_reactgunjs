/*
 Created By: Lightnet
 License: MIT
 
*/

import React, { Component } from "react";
import AliasInformationComponent from "./AliasInformationComponent";
import AliasSearchComponent from "./AliasSearchComponent";
import GunTestComponent from "./GunTestComponent";

export default class PublicKeyComponent extends Component {
    constructor(props) {
        super(props);
        //let user = this.$gun.user();
        //this.state = {}
    }
    render() {
        return (
            <div>
                <AliasInformationComponent></AliasInformationComponent>
                <GunTestComponent></GunTestComponent>
                <AliasSearchComponent></AliasSearchComponent>
            </div>
        );
    }
}