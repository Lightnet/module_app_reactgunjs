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
            keyparam:"",
            showgrantkey:false,
            showgrantto:false,
            showrevokekey:false,
            showrevoketo:false,
            showmessage:false,
            publickey:"",
            publicalias:"",
            message:"",
        }
        
        this.handleChangeAlias = this.handleChangeAlias.bind(this);
        this.handleChangeBorn = this.handleChangeBorn.bind(this);
        this.handleChangeEducation = this.handleChangeEducation.bind(this);
        this.handleChangeSkills = this.handleChangeSkills.bind(this);
        this._handleKeyPressAlias = this._handleKeyPressAlias.bind(this);
        this._handleKeyPressBorn = this._handleKeyPressBorn.bind(this);
        this._handleKeyPressEducation = this._handleKeyPressEducation.bind(this);
        this._handleKeyPressSkills = this._handleKeyPressSkills.bind(this);
        this.openDialogPublicKeyGrantKey = this.openDialogPublicKeyGrantKey.bind(this);
        this.openDialogPublicKeyRevokeKey = this.openDialogPublicKeyRevokeKey.bind(this);
        this.showGrantKeyModal = this.showGrantKeyModal.bind(this);
        this.showGrantToModal = this.showGrantToModal.bind(this);
        this.showRevokeKeyModal = this.showRevokeKeyModal.bind(this);
        this.showRevokeToModal = this.showRevokeToModal.bind(this);
        this.showMessageModal = this.showMessageModal.bind(this);
        this.handleChangePublicKey = this.handleChangePublicKey.bind(this);
        this.openDialogConfirmKeyUser = this.openDialogConfirmKeyUser.bind(this);

        this.btnRevokeLookup = this.btnRevokeLookup.bind(this);
        this.confirmRevokeKeyUser = this.confirmRevokeKeyUser.bind(this);

        this.getProfileData();
    }

    async getProfileData(){
        let self = this;
        let user = this.$gun.user();
        user.get('profile').get('alias').decryptvalue(ack=>{
            //console.log(ack);
            self.setState({alias:ack});
        });
        
        user.get('profile').get('born').decryptvalue(ack=>{
            //console.log(ack);
            self.setState({born:ack});
        });

        user.get('profile').get('education').decryptvalue(ack=>{
            //console.log(ack);
            self.setState({education:ack});
        });

        user.get('profile').get('skills').decryptvalue(ack=>{
            //console.log(ack);
            self.setState({skills:ack});
        });
        
    }

    handleChangePublicKey(event) {
        this.setState({publickey: event.target.value});
    }

    openDialogPublicKeyGrantKey(e){
        console.log(e);
        this.setState({keyparam:e});

        this.setState({ 
            showgrantkey:true
        });
        //console.log(this.state.keyparam);
    }

    async openDialogConfirmGrantKey(e){
        this.setState({ showgrantkey:false});
        console.log(e);
        //console.log(this.state.publickey);
        //console.log(this.state.keyparam);

        let key = this.state.publickey;
        console.log(key);
        if(!key){
            console.log('Empty!');
            return;
        }
        let to = this.$gun.user(key);
        let who = await to.get('alias').then();
        if(!who){
            console.log('No Alias!');
            this.setState({ message:"No Alias!"});
            this.setState({ showmessage:true});

        }else{
            this.setState({publicalias:who});
            this.setState({ showgrantto:true});
        }
    }

    async openDialogConfirmKeyUser(e){
        let user = this.$gun.user();
        let to = this.$gun.user(this.state.publickey);
        //console.log(user);
        //console.log(this.state.keyparam);
        let self = this;
        user.get('profile').get(this.state.keyparam).grantkey(to,ack=>{
            console.log(ack);
            self.setState({
                showgrantto:false,
                message:"Done!",
                showmessage:true,
            });
        })
    }

    openDialogPublicKeyRevokeKey(e){
        //console.log(e);
        this.setState({keyparam:e});

        this.setState({ 
            showrevokekey:true
        });
        //console.log(this.state.keyparam);
    }

    async btnRevokeLookup(e){
        this.setState({ showrevokekey:false});
        let key = this.state.publickey;
        console.log(key);
        let to = this.$gun.user(key);
        let who = await to.get('alias').then();
        if(!who){
            console.log('No Alias!');
            this.setState({ message:"No Alias!"});
            this.setState({ showmessage:true});

        }else{
            this.setState({publicalias:who});
            this.setState({ showrevoketo:true});
        }
    }

    async confirmRevokeKeyUser(e){
        let user = this.$gun.user();
        //let gun = this.$gun;
        console.log(this.state.keyparam)
        let to = this.$gun.user(this.state.publickey);
        let self = this;
        user.get('profile').get(this.state.keyparam).revokekey(to,ack=>{
            console.log(ack);

            self.setState({
                showrevoketo:false,
                message:"Done!",
                showmessage:true,
            });
        });

        self.setState({
            showrevoketo:false,
            message:"Done!",
            showmessage:true,
        });
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
        //e.preventDefault();
        //if (e.key === 'Enter') {
            //console.log('do validate');
            //console.log(this.state.alias);
            let alias = this.state.alias;
            let user = this.$gun.user();
            //user.get('profile').get('alias').secret(alias);
            user.get('profile').get('alias').encryptput(alias);
        //}
    }
    _handleKeyPressBorn(e) {
        //e.preventDefault();
        //if (e.key === 'Enter') {
            //console.log('do validate');
            //console.log(this.state.born);
            let born = this.state.born;
            let user = this.$gun.user();
            user.get('profile').get('born').encryptput(born);
        //}
    }

    _handleKeyPressEducation(e) {
        //e.preventDefault();
        //if (e.key === 'Enter') {
            //console.log('do validate');
            //console.log(this.state.education);
            let education = this.state.education;
            let user = this.$gun.user();
            //user.get('profile').get('education').secret(education);
            user.get('profile').get('education').encryptput(education);
        //}
    }
    _handleKeyPressSkills(e) {
        //e.preventDefault();
        //if (e.key === 'Enter') {
            //console.log('do validate');
            //console.log(this.state.skills);
            let skills = this.state.skills;
            let user = this.$gun.user();
            //user.get('profile').get('skills').secret(skills);
            user.get('profile').get('skills').encryptput(skills);
        //}
    }

    showGrantKeyModal(e){
        this.setState({ 
            showgrantkey: !this.state.showgrantkey
        });
    }
    showGrantToModal(e){
        this.setState({ 
            showgrantto: !this.state.showgrantto
        });
    }
    showRevokeKeyModal(e){
        this.setState({ 
            showrevokekey: !this.state.showrevokekey
        });
    }
    showRevokeToModal(e){
        this.setState({ 
            showrevoketo: !this.state.showrevoketo
        });
    }
    showMessageModal(e){
        this.setState({ 
            showmessage: !this.state.showmessage
        });
    }

    render() {
        return (
            <div>
                Profile Information: (Type to update profile.)
                <table>
                    <tbody>
                    <tr>
                        <td>Alias</td>
                        <td><input 
                                value={this.state.alias || ""} 
                                onChange={this.handleChangeAlias.bind(this)}
                                onKeyUp={this._handleKeyPressAlias.bind(this)}
                            /> <button onClick={()=>this.openDialogPublicKeyGrantKey('alias')}>+</button>
                            <button onClick={()=>this.openDialogPublicKeyRevokeKey('alias')}>-</button>
                            
                            </td>
                    </tr>
                    <tr>
                        <td>Born</td>
                        <td><input 
                                value={this.state.born || ""} 
                                onChange={this.handleChangeBorn.bind(this)} 
                                onKeyUp={this._handleKeyPressBorn.bind(this)}
                            /> <button onClick={()=>this.openDialogPublicKeyGrantKey('born')}>+</button>
                            <button onClick={()=>this.openDialogPublicKeyRevokeKey('born')}>-</button>
                            </td>
                    </tr>
                    <tr>
                        <td>Education</td>
                        <td><input 
                                value={this.state.education || ""} 
                                onChange={this.handleChangeEducation.bind(this)} 
                                onKeyUp={this._handleKeyPressEducation.bind(this)}
                            /> <button onClick={()=>this.openDialogPublicKeyGrantKey('education')}>+</button>
                            <button onClick={()=>this.openDialogPublicKeyRevokeKey('education')}>-</button>
                            </td>
                    </tr>
                    <tr>
                        <td>Skills</td>
                        <td><input 
                                value={this.state.skills || ""} 
                                onChange={this.handleChangeSkills.bind(this)} 
                                onKeyUp={this._handleKeyPressSkills.bind(this)}
                            /> <button onClick={()=>this.openDialogPublicKeyGrantKey('skills')}>+</button>
                            <button onClick={()=>this.openDialogPublicKeyRevokeKey('skills')}>-</button>
                            </td>
                    </tr>
                    
                    </tbody>
                </table>

                <ModalComponent show={this.state.showgrantkey} onClose={this.showGrantKeyModal}>
                    <p>Grant Access!</p>
                    <p>Public Key:<input value={this.state.publickey} onChange={this.handleChangePublicKey.bind(this)} ></input>
                    <button onClick={this.openDialogConfirmGrantKey.bind(this)}> Okay </button>
                    </p>
                </ModalComponent>

                <ModalComponent show={this.state.showgrantto} onClose={this.showGrantToModal}>
                    <p>Grant to:</p>
                    <p>{this.state.publicalias}</p>
                    <p><button onClick={this.openDialogConfirmKeyUser.bind(this)}> Confirm </button></p>
                </ModalComponent>

                <ModalComponent show={this.state.showrevokekey} onClose={this.showRevokeKeyModal}>
                    <p>Revoke Access!</p>
                    <p>Public Key:<input value={this.state.publickey} onChange={this.handleChangePublicKey.bind(this)}></input>
                    <button onClick={this.btnRevokeLookup.bind(this)}> Okay </button>
                    </p>
                </ModalComponent>

                <ModalComponent show={this.state.showrevoketo} onClose={this.showRevokeToModal}>
                    <p>Revoke to:</p>
                    <p>{this.state.publicalias}
                    <button onClick={this.confirmRevokeKeyUser.bind(this)}> Okay </button>
                    </p>
                </ModalComponent>


                <ModalComponent show={this.state.showmessage} onClose={this.showMessageModal}>
                    <p>Message:</p>
                    <p>{this.state.message}</p>
                </ModalComponent>

            </div>
        );
    }
}