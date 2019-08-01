/*
 Created By: Lightnet
 License: MIT
 
*/
//https://facebook.github.io/create-react-app/docs/importing-a-component
//https://stackoverflow.com/questions/37427508/react-changing-an-uncontrolled-input

import React, { Component } from "react";
//import {gun} from "../store";

export default class ForgotPassphaseComponent extends Component {

    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            alias: "",
            aliaskooup:'',//input variable
            question1: "",
            question1: "",
            hint1:"",
            lookpublickey:'',
        };
        this.btnCancel = this.btnCancel.bind(this);
        this.clickRecover = this.clickRecover.bind(this);

        this.handleChangequestion1 = this.handleChangequestion1.bind(this);
        this.handleChangequestion2 = this.handleChangequestion2.bind(this);
        this.handleChangeHint = this.handleChangeHint.bind(this);

    }

    btnCancel(e){
        this.props.backcall && this.props.backcall(e);
    }

    //input handler
    handleChangealias(event) {
        this.setState({alias: event.target.value});
    }

    //input handler
    async handlelookalias(event) {
        this.setState({aliaskooup: event.target.value});

        let gun = this.$gun;
        let alias = await gun.get('~@'+event.target.value).then(); //broken or remove?
        console.log(alias);
        if(!alias){
            //this.statusdisplay = 'Not Found!';
            console.log('Not Found!');
            return;
        }else{
            //this.statusdisplay = 'Found!';
            console.log('Found!');
        }
        let publickey = '';
        for(var obj in alias){
            console.log(obj);
            publickey = obj;
        }
        publickey = publickey.substring(1,publickey.length);//remove ~ string begin
        this.setState({lookpublickey:publickey});
        //this.publickey = publickey;
    }

    //input handler
    handleChangePassphrase(event) {
        this.setState({passphrase: event.target.value});
    }
    //input handler
    handleChangequestion1(event) {
        this.setState({question1: event.target.value});
    }
    //input handler
    handleChangequestion2(event) {
        this.setState({question2: event.target.value});
    }
    //input handler
    handleChangeHint(event) {
        this.setState({hint: event.target.value});
    }

    async clickRecover(e){
        let gun = this.$gun;
        //let user = this.$gun.user();
        let alias = (this.state.aliaskooup || '').trim(); //get alias input
        let q1 =  (this.state.question1 || '').trim(); //get q1 input
        let q2 = (this.state.question2 || '').trim(); //get q2 input
        //console.log('get forgot hint');
        if(!alias || !q1 || !q2 ){
            console.log('Empty!');
            return;
        }
        //console.log(alias);
        //Make sure the alias and public key are working
        alias = await gun.get('~@'+alias).then();//look for hash id
        let publickey = '';
        for(var obj in alias){
            //console.log(obj);
            publickey = obj;
        }
        publickey = publickey.substring(1,publickey.length);
        if(!publickey){
            return;
        }
        //let publickey = this.publickey;
        let to = this.$gun.user(publickey);
        let who = await to.get('alias').then();
        //console.log(who);
        if(!who){
            //console.log(who);
            console.log('Not Alias!');
            return;
        }
        //let hint = await gun.get('alias/'+alias).map().get('hint').then();//get hash hint string
        let hint = hint = await to.get('hint').then();
        let dec = await Gun.SEA.work(q1,q2);//get q1 and q2 string to key hash
        hint = await Gun.SEA.decrypt(hint,dec);//get hint and key decrypt message
        //console.log('hint',hint);
        if(hint !=null){//check if hint is string or null
            //$('#hint').val(hint);//get hint and set input value
            hint = hint;
        }else{
            //$('#hint').val('Fail Decrypt!');//if null set input to message user.
            hint = 'Fail Decrypt!';
        }
        this.setState({hint:hint});
        console.log("end checked...");
    }

    render() {
 
        return( 
            <div>
                Forgot Passphrase
                <table>
                    <tbody>
                        <tr>
                            <td>
                                Alias:
                            </td>
                            <td>
                                <input value={this.state.aliaskooup || ""} onChange={this.handlelookalias.bind(this)} />
                            </td>
                        </tr><tr>
                            <td>
                                Question 1:
                            </td>
                            <td>
                                <input value={this.state.question1 || ""} onChange={this.handleChangequestion1.bind(this)} />
                            </td>
                        </tr><tr>
                            <td>
                                Question 2:
                            </td>
                            <td>
                                <input value={this.state.question2 || ""} onChange={this.handleChangequestion2.bind(this)} />
                            </td>
                        </tr><tr>
                            <td>
                                Hint:
                            </td>
                            <td>
                                <input value={this.state.hint || ""} onChange={this.handleChangeHint.bind(this)} />
                            </td>
                        </tr><tr>
                            <td>
                            </td>
                            <td>
                                <button onClick={this.clickRecover.bind(this)}>Recover</button>
                                <button onClick={this.btnCancel.bind(this)}>Cancel</button>
                            </td>
                        </tr>
                    </tbody>
                </table>

                
            </div>
        );  
    }
}