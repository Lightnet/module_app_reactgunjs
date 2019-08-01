/*
 Created By: Lightnet
 License: MIT
 
*/

import React, { Component } from "react";
import ModalComponent from  "../base/ModalComponent";

export default class AliasInformationComponent extends Component {
    constructor(props) {
        super(props);
        //let user = this.$gun.user();

        this.state = {
            alias:"",
            born:"",
            education:"",
            skills:"",
            publickey:"",
            publicalias:"",
            status:"Alias Public Key!"
        }
        
        this.handleChangeAlias = this.handleChangeAlias.bind(this);
        this.handleChangeBorn = this.handleChangeBorn.bind(this);
        this.handleChangeEducation = this.handleChangeEducation.bind(this);
        this.handleChangeSkills = this.handleChangeSkills.bind(this);
        this._handleKeyPressAlias = this._handleKeyPressAlias.bind(this);
        this._handleKeyPressBorn = this._handleKeyPressBorn.bind(this);
        this._handleKeyPressEducation = this._handleKeyPressEducation.bind(this);
        this._handleKeyPressSkills = this._handleKeyPressSkills.bind(this);

        this.handleKeyPublicKey = this.handleKeyPublicKey.bind(this);

    }

    async getProfileData(){
        let self = this;
        let to = this.$gun.user(this.state.publickey);

        let who = await to.get('alias').then();
        if(!who){
            console.log('No Alias!');
            this.setState({ status:"No Alias!"});
            return;
        }else{
            this.setState({status:who});
        }
        
        to.get('profile').get('alias').decryptdata(to,ack=>{
            //console.log(ack);
            self.setState({alias:ack});
        });

        to.get('profile').get('born').decryptdata(to,ack=>{
            //console.log(ack);
            self.setState({born:ack});
        });

        to.get('profile').get('education').decryptdata(to,ack=>{
            //console.log(ack);
            self.setState({education:ack});
        });

        to.get('profile').get('skills').decryptdata(to,ack=>{
            //console.log(ack);
            self.setState({skills:ack});
        });
        
    }

    handleChangePublicKey(event) {
        this.setState({publickey: event.target.value});
    }

    handleKeyPublicKey(event) {
        this.setState({publickey: event.target.value});
        this.getProfileData();
    }

    handleChangeAlias(event) {
        this.setState({alias: event.target.value});
    }
    handleChangeBorn(event) {
        this.setState({born: event.target.value});
    }
    handleChangeEducation(event) {
        this.setState({education: event.target.value});
    }
    handleChangeSkills(event) {
        this.setState({skills: event.target.value});
    }
    _handleKeyPressAlias(e) {

    }
    _handleKeyPressBorn(e) {

    }
    _handleKeyPressEducation(e) {

    }
    _handleKeyPressSkills(e) {

    }

    render() {
        return (
            <div>
                Alias Search:
                <table>
                    <tbody>
                    <tr>
                        <td>Public Key</td>
                        <td><input 
                                value={this.state.publickey || ""} 
                                onChange={this.handleChangePublicKey.bind(this)}
                                onKeyUp={this.handleKeyPublicKey.bind(this)}
                            /> Status:{this.state.status}
                            </td>
                    </tr>

                    <tr>
                        <td>Alias</td>
                        <td><input 
                                value={this.state.alias || ""} 
                                onChange={this.handleChangeAlias.bind(this)}
                            /> 
                            </td>
                    </tr>
                    <tr>
                        <td>Born</td>
                        <td><input 
                                value={this.state.born || ""} 
                                onChange={this.handleChangeBorn.bind(this)} 
                            /> 
                            </td>
                    </tr>
                    <tr>
                        <td>Education</td>
                        <td><input 
                                value={this.state.education || ""} 
                                onChange={this.handleChangeEducation.bind(this)} 
                            /> 
                            </td>
                    </tr>
                    <tr>
                        <td>Skills</td>
                        <td><input 
                                value={this.state.skills || ""} 
                                onChange={this.handleChangeSkills.bind(this)} 
                            /> 
                            </td>
                    </tr>
                    
                    </tbody>
                </table>

            </div>
        );
    }
}