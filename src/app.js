'use strict';
// demo in class

const net = require('net');

// const clientis a socket that connectes to local host @1113
const client = new net.Socket();

client.connect(3001, 'localhost',()=>{});

const events=['read','create','update','delete'];

setInterval( ()=>{
  // automating chatter 
  let event= events[Math.floor(Math.random()*events.length)]
  client.write(`${event} an event of ${event} just happened!`)
}, 800);

client.on('close', function() {
  console.log('Connection closed');
});

// client.destroy(); // kill client after server's response

// starter code

// const fs = require('fs');

// const alterFile = (file) => {
//   fs.readFile( file, (err, data) => {
//     if(err) { throw err; }
//     let text = data.toString().toUpperCase();
//     fs.writeFile( file, Buffer.from(text), (err, data) => {
//       if(err) { throw err; }
//       console.log(`${file} saved`);
//     });
//   });
// };

// let file = process.argv.slice(2).shift();
// alterFile(file);
