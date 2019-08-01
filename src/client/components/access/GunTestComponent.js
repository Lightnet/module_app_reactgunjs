/*
 Created By: Lightnet
 License: MIT
 
*/
//https://facebook.github.io/create-react-app/docs/importing-a-component
//https://stackoverflow.com/questions/37427508/react-changing-an-uncontrolled-input

import React, { Component } from "react";
import ModalComponent from  "../base/ModalComponent";
//import {gun} from "../store";

export default class GunTestComponent extends Component {

    constructor(props) {
        super(props);
        //console.log(props);
        this.state = {
            keyid:"data",
            showgrantkey:false,
            showgrantto:false,
            showrevokekey:false,
            showrevoketo:false,
            showmessage:false,
            publickey:"",
            publicalias:"",
            message:"",
        };
        this.btnkeyset = this.btnkeyset.bind(this);
        this.btnkeyget = this.btnkeyget.bind(this);
        this.handleChangeKeyValue = this.handleChangeKeyValue.bind(this);
        this.btnPublicKeyGrantKey = this.btnPublicKeyGrantKey.bind(this);
        this.btnPublicKeyRevokeKey = this.btnPublicKeyRevokeKey.bind(this);
        
        
        this.showGrantKeyModal = this.showGrantKeyModal.bind(this);
        this.showGrantToModal = this.showGrantToModal.bind(this);
        
        this.showRevokeKeyModal = this.showRevokeKeyModal.bind(this);
        this.showRevokeToModal = this.showRevokeToModal.bind(this);
        this.showMessageModal = this.showMessageModal.bind(this);
        this.handleChangePublicKey = this.handleChangePublicKey.bind(this);
        this.openDialogConfirmKeyUser = this.openDialogConfirmKeyUser.bind(this);

        this.btnkeygetdata = this.btnkeygetdata.bind(this);

        this.btnRevokeLookup = this.btnRevokeLookup.bind(this);
        this.confirmRevokeKeyUser = this.confirmRevokeKeyUser.bind(this);
        
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

    handleChangePublicKey(event) {
        this.setState({publickey: event.target.value});
    }

    btnPublicKeyGrantKey(e){
        console.log(e);
        this.setState({ 
            showgrantkey:true
        });
        //console.log(this.state.keyparam);
    }

    async openDialogConfirmGrantKey(e){
        this.setState({ showgrantkey:false});
        console.log(e);
        console.log(this.state.publickey);
        console.log(this.state.keyparam);

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
        let gun = this.$gun;
        let to = this.$gun.user(this.state.publickey);
        //console.log(user);
        //console.log(this.state.keyparam);
        //user.get('profile').get(this.state.keyparam).grantkey(to,ack=>{
            //console.log(ack);
        //});
        gun.get("sldijfgnosdij").get("beta00").grantkey(to,ack=>{
            console.log(ack);
            if(ack.ok){
                this.setState({ showgrantto:false});
                this.setState({ message:"Done!"});
                this.setState({ showmessage:true});
            }
        });
    }

    btnPublicKeyRevokeKey(e){
        //console.log(e);
        this.setState({ 
            showrevokekey:true
        });
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
        let gun = this.$gun;
        let to = this.$gun.user(this.state.publickey);
        //console.log(user);
        //console.log(this.state.keyparam);
        //user.get('profile').get(this.state.keyparam).grantkey(to,ack=>{
            //console.log(ack);
        //});
        gun.get("sldijfgnosdij").get("beta00").revokekey(to,ack=>{
            console.log(ack);
            if(ack.ok){
                this.setState({ showrevoketo:false});
                this.setState({ message:"Done!"});
                this.setState({ showmessage:true});
            }
            
        });
    }
    
    handleChangeKeyValue(event) {
        this.setState({keyid: event.target.value});
    }

    btnkeyset(e){
        let gun = this.$gun;
        gun.get("sldijfgnosdij").get("beta00").encryptput(this.state.keyid);
        //gun.get("sldijfgnosdij").get("beta00").encryptput('data',ack=>{
            //console.log(ack);
        //},{sharekeyvalue:"vald"});
    }

    btnkeyget(e){
        let gun = this.$gun;
        gun.get("sldijfgnosdij").get("beta00").decryptvalue(ack=>{
            console.log(ack);
        });
    }

    btnkeygetdata(e){
        let gun = this.$gun;
        let to = gun.user(this.state.publickey);
        gun.get("sldijfgnosdij").get("beta00").decryptdata(to,ack=>{
            console.log(ack);
        });
    }

    render() {
 
        return( 
            <div>
                Value<input value={this.state.keyid}  onChange={this.handleChangeKeyValue.bind(this)} ></input>
                <button onClick={this.btnkeyset.bind(this)}>Key Set</button>
                <button onClick={this.btnkeyget.bind(this)}>Key Get</button>

                <br></br>Public Key:<input value={this.state.publickey}  onChange={this.handleChangePublicKey.bind(this)} ></input>
                <button onClick={this.btnPublicKeyGrantKey.bind(this)}>Grant</button>
                <button onClick={this.btnPublicKeyRevokeKey.bind(this)}>Revoke</button>

                <button onClick={this.btnkeygetdata.bind(this)}>Get Data</button>

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