const {io} = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');
const bands = new Bands();

bands.addBands(new Band('Queen'));
bands.addBands(new Band('Bon'));
bands.addBands(new Band('Metalica'));
bands.addBands(new Band('Yeah'));

//console.log(bands);

// Mensajes de sockets
io.on('connection', client => {
    console.log('Cliente conectado');

    client.emit('active-bands',bands.getBands());

    client.on('disconnect', () => {
        console.log('Cliente desconectado');
    });

    client.on('vote-band', (payload)=>{
        bands.voteBand(payload.id);
        io.emit('active-bands',bands.getBands());
    });

    //Escuchar: add-band
    client.on('add-band', (payload)=>{
        console.log('add-band', payload.name);
        const newBand = new Band(payload.name);
        bands.addBands(newBand);
        io.emit('active-bands',bands.getBands());
    });

    // Delete-band
    client.on('delete-band', (payload)=>{
        bands.deleteBands(payload.id);
        io.emit('active-bands',bands.getBands());
    });


    /// PRUEBAS
    client.on('mensaje', (mensaje)=>{
        console.log('Mensaje!!', mensaje);
        io.emit('mensaje',{admin:'David'});
    });
    client.on('emitir-mensaje',(payload)=>{
        //io.emit('nuevo-mensaje',payload); // emite a todos
        client.broadcast.emit('nuevo-mensaje',payload); // emite a todos menos al que lo emitio
    });
    client.on("flutter",(payload)=>{
        console.log('recibido', payload);
        client.broadcast.emit("flutter-web", payload);
    });
});