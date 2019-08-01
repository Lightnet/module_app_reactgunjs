/*
 Created By: Lightnet
 License: MIT
 
*/

import React, { Component } from "react";
//import {gun} from "../store";
//https://facebook.github.io/create-react-app/docs/importing-a-component

export default class PassphaseHintComponent extends Component {

    constructor(props) {
        super(props);
        //console.log(props);
        this.state = {
            Question1: "",
            Question2: "",
            Hint:""
        };

        this.handleChangeQuestion1 = this.handleChangeQuestion1.bind(this);
        this.handleChangeQuestion2 = this.handleChangeQuestion2.bind(this);
        this.handleChangeHint = this.handleChangeHint.bind(this);

        this.getQuestionHint = this.getQuestionHint.bind(this);

        this.getQuestionHint();
    }

    async getQuestionHint(){
        console.log("get data");
        let user = this.$gun.user();
        let pair = user._.sea;
        let sec = await Gun.SEA.secret(pair.epub, pair);//get user for encrypt message

        let question1 = await user.get('forgot').get('q1').then();
        question1 = await Gun.SEA.decrypt(question1, sec);//encrypt hint
        this.setState({question1:question1});

        let question2 = await user.get('forgot').get('q2').then();
        question2 = await Gun.SEA.decrypt(question2, sec);//encrypt hint
        this.setState({question2:question2});

        sec = await Gun.SEA.work(question1,question2);//encrypt key
        let hint = await user.get('hint').then();
        //console.log(this.hint);
        hint = await Gun.SEA.decrypt(hint, sec);//encrypt hint
        this.setState({hint:hint});
    }

    handleChangeQuestion1(event) {
        this.setState({question1: event.target.value});
    }

    handleChangeQuestion2(event) {
        this.setState({question2: event.target.value});
    }

    handleChangeHint(event) {
        this.setState({hint: event.target.value});
    }

    async clickChangeHint(){
        let user = this.$gun.user();
        let pair = user._.sea;
        let self = this;
        console.log('Apply Hint!');

        
        let q1 = this.state.question1; //get input q1
        let q2 = this.state.question2;//get input q2
        let hint = this.state.hint;//get input hint

        if(!q1 || !q2 || !hint){
            console.log('empty');
            return;
        }

        let sec = await Gun.SEA.secret(pair.epub, pair);//get user for encrypt message
        let enc_q1 = await Gun.SEA.encrypt(q1, sec);//encrypt q1
        user.get('forgot').get('q1').put(enc_q1);//set hash q1 to user data store
        let enc_q2 = await Gun.SEA.encrypt(q2, sec);//encrypt q1
        user.get('forgot').get('q2').put(enc_q2); //set hash q2 to user data store
        sec = await Gun.SEA.work(q1,q2);//encrypt key
        //console.log(sec);
        
        let enc = await Gun.SEA.encrypt(hint, sec);//encrypt hint
        console.log(enc);
        user.get('hint').put(enc,ack=>{//set hash hint
            //console.log(ack);
            if(ack.ok){
                //displayeffectmessage('Hint Apply!'); //display message effects
                //self.$root.$emit('dialogmessage','Hint Apply!');
                console.log('Hint Apply!');
            }
        });
        
    }

    render() {
        
        return( 
            <div>

                <table>
                    <tbody>
                        <tr>
                            <td>Question 1:</td>
                            <td><input value={this.state.question1 || ""} onChange={this.handleChangeQuestion1.bind(this)} /></td>
                        </tr>
                        <tr>
                            <td>Question 2</td>
                            <td><input value={this.state.question2 || ""} onChange={this.handleChangeQuestion2.bind(this)} /></td>
                        </tr>
                        <tr>
                            <td>Hint </td>
                            <td><input value={this.state.hint || ""} onChange={this.handleChangeHint.bind(this)} /></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td><button onClick={this.clickChangeHint.bind(this)}>Apply</button></td>
                        </tr>
                    </tbody>
                </table>

            </div>
        );  
    }
}