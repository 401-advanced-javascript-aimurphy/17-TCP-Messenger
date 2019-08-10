'use strict';

const net = require('net');

const client = new net.Socket();

client.connect(3001, '172.16.0.231', ()=>console.log('connected yo!'));

client.on('data', function(data){
  let payload = JSON.parse(data);
  // console.log(payload);
  // specialize
  if(payload.event==="read") console.log(payload);
})

client.on('close',function(){
  console.log('closed ');
});

// node server
// cmd shift d?
// node logger?
