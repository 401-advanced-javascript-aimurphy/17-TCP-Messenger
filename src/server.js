'use strict';

// go make your dot env PORT 3001
// this server is a net server not an express server

const net = require('net');

const port = process.env.PORT || 3001;
const server = net.createServer();

// server.listen(port, () => console.log(`Server up on ${port}`) );

// @1052
let allowedEvent = ['create', 'read', 'update', 'delete', 'error', 'attack'];


// socket pool is the list of people who are connected to the server, 
let socketPool = {};

// @ 1053 socket is rthe little pipe in the big pipe. when you connect you 
  // socketPool:{
  //   12312:{socket},
  //   38574398: {socket}
  // }
server.on('connection', (socket) => {
  const id = `Socket-${Math.random()}`;//could also use uuid
  // now you are bringing  a person into the socket.
  socketPool[id] = socket;
  // socket on data needs to have event plus payload
  // dispatch event
  // on data, we will get a buffer and call a thing called dispatch event---takes a buffer, does the work.
  // also need to handle the close: you connect to the server, and press ctrl c and disconnect. When you disconnect we need to let the server close it and re open it to the world. server takes care fo that but we need to take care of the pool, so that we dont have a dead id in the pool creating memory leak
  // TLDR handle data coming in and close it out from the ppol when they leave.
  socket.on('data', (buffer) => dispatchEvent(buffer));
  socket.on('close', () => {
    delete socketPool[id];
  });
});


// @1100 
// do the work
// tear it up
// good message: event, payload
// dispatch
let dispatchEvent = (buffer) => {
  // this is the text
  let text = buffer.toString().trim();
  let [event, payload] = text.split(/\s+(.*)/);
  // get me the thing and split it twice. this is easier

  if (allowedEvent.includes(event)){
    // send to everybody in the pool!
    let eventPayload = {event,payload};
    // the below object is going to be json stringified to be sent 
    // ex: json.stringify()
    // event: "create".
    // payload:"something got made"<--we are sending an obj like this over thewire... by doing a for loop.
    // }else{ignore the event}
    for (let socket in socketPool) {
      socketPool[socket].write(`${event} ${text}`);
    }
  }else{
    console.log(`INGNORED ${event}`)
  }
  
};


module.exports = server;