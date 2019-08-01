
https://github.com/amark/gun/wiki/User

```
// on success calls callback with a reference to the gun user
// cb(at) where at is an object as below
{
    ack: 2,
    back: object, //reference to the root object (internal)
    get: "~publicKeyOfUser",
    gun: object, //gun root (internal)
    id: 6, //id of the node in graph (internal)
    on: function onto(),
    opt: object, //uuid function object (internal)
    put: object, //object containing pub, alias and epub of the user
    root: object, //gun root reference (internal)
    sea: object, //object containing keys of the user
    soul: "~publicKeyOfUser",
    tag: object //gun in and out reference (internal)
}
// on failure callback is called cb(ack) where ack is as below
{
    err: 'Wrong user or password.'
}
```


```
axe: false
```

```javascript
//https://github.com/eraeco/party.lol
var str = "Hello World!";
var enc = window.btoa(str);
var dec = window.atob(enc);

var res = "Encoded String: " + enc + "<br>" + "Decoded String: " + dec;
```