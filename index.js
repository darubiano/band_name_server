/*
npm init -y
npm i express
npm i dotenv
npm i socket.io
npm i uuid
# probar
node index.js
# modo demonio
npm i -g nodemon
nodemon index.js
*/
// importacion
const express = require('express');
const path = require('path');
const app = express();
// Configuracion de variables de entorno
require('dotenv').config();
// Node server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket')
//Path publico
const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));

server.listen(process.env.PORT, (err)=>{
    if (err) throw new Error(err);
    console.log('Servidor corriendo en puerto',process.env.PORT);
});