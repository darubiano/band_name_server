const {io} = require('../index');
// Mensajes de sockets
io.on('connection', client => {
    console.log('Cliente conectado');
    client.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
    client.on('mensaje', (mensaje)=>{
        console.log('Mensaje!!', mensaje);
        io.emit('mensaje',{admin:'David'});
    });
});