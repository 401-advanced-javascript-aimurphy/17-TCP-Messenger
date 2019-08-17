'use strict';
const port = 3001;
const server = require('./src/server')


server.listen(port, () => console.log(`Server up on ${port}`) );