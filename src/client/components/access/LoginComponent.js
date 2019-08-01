/*
 Created By: Lightnet
 License: MIT
 
*/

import React, { Component } from "react";
import ModalComponent from  "../base/ModalComponent";
//import { gun } from "../../store";
//https://facebook.github.io/create-react-app/docs/importing-a-component

export default class LoginComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            alias: "test",
            passphrase: "test",
            showmodelmessage:false,
            message:"",
        };
        //console.log(this);
        this.btnregister = this.btnregister.bind(this);
        this.btnlogin = this.btnlogin.bind(this);
        this.btnforgot = this.btnforgot.bind(this);
        this.handleChange_passphrase = this.handleChange_passphrase.bind(this);
        this.handleChange_alias = this.handleChange_alias.bind(this);

        this.showMessageModal = this.showMessageModal.bind(this);
    }

    showMessageModal(e){
        this.setState({ 
            showmodelmessage: !this.state.showmodelmessage
        });
    }

    btnregister(event){
        event.preventDefault();
        console.log("btnregister");
        let user = this.$gun.user();
        let self = this;
        console.log(this.state.alias);
        console.log(this.state.passphrase);
        if((this.state.alias.length == 0)||(this.state.alias.length == 0)){
            console.log("Empty!");
            return;
        }
        
        user.create(this.state.alias, this.state.passphrase, function(ack){
            //console.log(ack);
            if(ack.err){
                console.log("fail!");
                //self.msg = "Register Alias Fail!";
                self.setState({ 
                    message:ack.err,
                    showmodelmessage:true,
                });
            }
            if(ack.pub){
                console.log("created!", ack.pub);
                //self.msg = "Alias Created!";
                //self.bregister = false;
                self.setState({ 
                    message:"Alias Created!",
                    showmodelmessage:true,
                });
            }
        });
        
    }

    btnlogin(event){
        event.preventDefault();
        //console.log("btnlogin");
        //this.setState({this.props.isLoggedIn:true})
        //this.setState({isLoggedIn:true});
        //this.props.loginPass();
        if((this.state.alias.length == 0)||(this.state.passphrase.length == 0)){
            console.log("Empty!");
            return;
        }
        //console.log(this.$gun);
        let user = this.$gun.user();
        let self = this;
        user.auth(this.state.alias, this.state.passphrase,(ack)=>{
            //console.log(ack);
            if(ack.err){
                console.log("fail!");
                this.setState({ 
                    message:ack.err,
                    showmodelmessage:true,
                });

            }else{
                console.log("Authorized!");
                //self.props.onClick('key');
                self.props.loginPass();
            }
        });
    }

    btnforgot(event){
        event.preventDefault();
        console.log("btnforgot");
        this.props.forgotpassphrasecall && this.props.forgotpassphrasecall(event);
    }

    handleChange_passphrase(event){
        console.log(event);
        this.setState({
            passphrase: event.target.value
        });
    }

    handleChange_alias(event){
        console.log(event);
        this.setState({
            alias: event.target.value
        });
    }

    render() {
        const buttonStyle = {
            //color: 'white',
            //"background-color":'black',
            "border":"none",
            //backgroundImage: 'url(' + imgUrl + ')',
        };  
        return( 
            <div>
                <table>
                    <tbody>
                        <tr>
                            <td>
                            <label>Alias:</label>
                            </td>
                            <td>
                            <input value={this.state.alias} onChange={this.handleChange_alias}></input>    
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Passphrase:</label>
                            </td>
                            <td>
                                <input value={this.state.passphrase} onChange={this.handleChange_passphrase}></input>
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <button style={buttonStyle} onClick={this.btnregister.bind(this)}>Register</button>
                            </td>
                            <td>
                                <button style={buttonStyle} onClick={this.btnlogin.bind(this)}>Login</button>
                                <button style={buttonStyle} onClick={this.btnforgot}>Forgot</button>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <ModalComponent show={this.state.showmodelmessage} onClose={this.showMessageModal}>
                    <p>Message:</p>
                    <p>{this.state.message}</p>
                </ModalComponent>

            </div>
        );  
    }
}