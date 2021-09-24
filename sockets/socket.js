const { io } = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');

const bands = new Bands();

bands.addBand(new Band('Sour Stone'));
bands.addBand(new Band('AC/DC'));
bands.addBand(new Band('Iron Maiden'));
bands.addBand(new Band('Architects'));


// Mensajes de sockets
io.on('connection', client => {

    console.log('Cliente conectado');

    client.emit('active-bands', bands.getBands());

    client.on('disconnect', () => { console.log('Cliente desconectado') });

    //Obtiene mensaje emitido desde el index.html
    client.on('mensaje', (payload) => {
        console.log('Mensaje recibido: ', payload);

        io.emit('Mensaje desde backend:', { admin: 'Nuevo mensaje de admin' })
    });

    client.on('vote-band', (payload) => {
        bands.voteBand(payload.id);
        io.emit('active-bands', bands.getBands());
    });

    client.on('add-band', (payload) => {
        const newband = new Band(payload.name);
        bands.addBand(newband);
        io.emit('active-bands', bands.getBands());
    });

    client.on('delete-band', (payload) => {
        bands.deleteBand(payload.id);
        io.emit('active-bands', bands.getBands());
    });

    // client.on('emitir-mensaje', (payload) => {
    //     // io.emit('nuevo-mensaje', payload); //emite a todos
    //     client.broadcast.emit('nuevo-mensaje', payload); //emite a todos menos a lo que env

    // })
});