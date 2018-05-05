import React from "react";
import ReactDOM from "react-dom";

import Gun from 'gun/gun';

var gun;
//url dir
console.log(location.origin);
//check if dev local pc or site host
if(location.origin == 'http://localhost:3000'){
  gun = Gun('http://127.0.0.1:8080' + '/gun');
  console.log('local development');
}else{
  console.log('host development');
  gun = Gun(location.origin + '/gun');
}
//init connection to server
gun.get('data').once(()=>{});

//simple handle click
function handleClick(e) {
  console.log("test?");
  gun.get('data').put({test:'test1'});
}

//https://reactjs.org/docs/hello-world.html
//https://reactjs.org/docs/rendering-elements.html

//render html
const Index = () => {
  return <div>Hello React! <a href="#" onClick={handleClick}>Click me</a> </div>;
};

//entry point to add render html
ReactDOM.render(<Index />, document.getElementById("index"));