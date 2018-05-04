import React from "react";
import ReactDOM from "react-dom";

import Gun from 'gun/gun';

var gun;
console.log(location.origin);
if(location.origin == 'http://localhost:3000'){
  gun = Gun('http://127.0.0.1:8080' + '/gun');
  console.log('local development');
}else{
  console.log('host development');
  gun = Gun(location.origin + '/gun');
}

gun.get('data').once(()=>{});


function handleClick(e) {
  console.log("test?");
  gun.get('data').put({test:'test1'});
}

const Index = () => {
  return <div>Hello React! <a href="#" onClick={handleClick}>Click me</a> </div>;
};

ReactDOM.render(<Index />, document.getElementById("index"));